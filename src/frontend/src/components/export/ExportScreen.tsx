import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Download, FileArchive, FileText, Package, AlertCircle, Loader2 } from 'lucide-react';
import type { GeneratedBundle } from '../../types/productEntry';
import { downloadBlob } from '../../lib/downloads';
import { generateProductPdfName, generateProductZipName, generateAllProductsZipName } from '../../lib/filename';
import { buildAllProductsZip } from '../../lib/zip/buildAllProductsZip';
import { getCoverPath } from '../../lib/assets/covers';
import ExportInstructions from './ExportInstructions';

interface ExportScreenProps {
  bundles: GeneratedBundle[];
  onBack: () => void;
}

export default function ExportScreen({ bundles, onBack }: ExportScreenProps) {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadPdf = (bundle: GeneratedBundle) => {
    try {
      const filename = generateProductPdfName(`product-${bundle.productId}`, bundle.versionTag);
      downloadBlob(bundle.pdfBlob, filename);
    } catch (err) {
      setError('Failed to download PDF. Please try again.');
      console.error('PDF download error:', err);
    }
  };

  const handleDownloadZip = (bundle: GeneratedBundle) => {
    try {
      const filename = generateProductZipName(`product-${bundle.productId}`, bundle.versionTag);
      downloadBlob(bundle.zipBlob, filename);
    } catch (err) {
      setError('Failed to download ZIP. Please try again.');
      console.error('ZIP download error:', err);
    }
  };

  const handleDownloadAll = async () => {
    setError(null);
    setIsDownloadingAll(true);
    try {
      const allZip = await buildAllProductsZip(bundles);
      const filename = generateAllProductsZipName();
      downloadBlob(allZip, filename);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to create master ZIP file: ${errorMessage}. Please try again.`);
      console.error('Master ZIP creation error:', err);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const formatFileSize = (blob: Blob): string => {
    const kb = blob.size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Export Products</h2>
          <p className="text-muted-foreground">Download your generated product files</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onBack} variant="outline">
            Back to Editor
          </Button>
          <Button onClick={handleDownloadAll} size="lg" disabled={isDownloadingAll}>
            {isDownloadingAll ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating ZIP...
              </>
            ) : (
              <>
                <Package className="mr-2 h-4 w-4" />
                Download All Products
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="max-h-[600px] overflow-hidden">
        <div className="h-[600px] overflow-y-auto touch-scroll pr-4" tabIndex={0}>
          <ExportInstructions />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {bundles.map((bundle) => (
          <Card key={bundle.productId}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Product {bundle.productId.split('-')[1]}</CardTitle>
                  <CardDescription>
                    Generated {bundle.generatedAt.toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{bundle.versionTag}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[5/8] rounded-lg overflow-hidden bg-muted border">
                <img
                  src={getCoverPath(bundle.productId)}
                  alt={`Product ${bundle.productId} cover`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">PDF</span>
                  <span className="font-mono">{formatFileSize(bundle.pdfBlob)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Complete ZIP</span>
                  <span className="font-mono">{formatFileSize(bundle.zipBlob)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownloadPdf(bundle)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button
                  onClick={() => handleDownloadZip(bundle)}
                  size="sm"
                  className="flex-1"
                >
                  <FileArchive className="mr-2 h-4 w-4" />
                  ZIP
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Complete breakdown of generated files</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>PDF Size</TableHead>
                <TableHead>ZIP Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bundles.map((bundle) => (
                <TableRow key={bundle.productId}>
                  <TableCell className="font-medium">
                    Product {bundle.productId.split('-')[1]}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{bundle.versionTag}</Badge>
                  </TableCell>
                  <TableCell>{bundle.generatedAt.toLocaleDateString()}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatFileSize(bundle.pdfBlob)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatFileSize(bundle.zipBlob)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleDownloadPdf(bundle)}
                        variant="ghost"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
