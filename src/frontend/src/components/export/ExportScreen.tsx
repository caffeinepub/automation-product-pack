import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Download, FileArchive, FileText, Package, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import type { GeneratedBundle } from '../../types/productEntry';
import { downloadBlob } from '../../lib/downloads';
import { generateProductPdfName, generateProductZipName, generateAllProductsZipName } from '../../lib/filename';
import { buildAllProductsZip } from '../../lib/zip/buildAllProductsZip';
import { getCoverPath } from '../../lib/assets/covers';
import { DEFAULT_PRODUCTS } from '../../lib/defaultProducts';
import ExportInstructions from './ExportInstructions';
import { ScrollArea } from '../ui/scroll-area';

interface ExportScreenProps {
  bundles: GeneratedBundle[];
  onBack: () => void;
}

export default function ExportScreen({ bundles, onBack }: ExportScreenProps) {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductName = (productId: string): string => {
    const product = DEFAULT_PRODUCTS.find(p => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  const handleDownloadPdf = (bundle: GeneratedBundle) => {
    try {
      const productName = getProductName(bundle.productId);
      const filename = generateProductPdfName(productName, bundle.versionTag);
      downloadBlob(bundle.pdfBlob, filename);
    } catch (err) {
      setError('Failed to download PDF. Please try again.');
      console.error('PDF download error:', err);
    }
  };

  const handleDownloadZip = (bundle: GeneratedBundle) => {
    try {
      const productName = getProductName(bundle.productId);
      const filename = generateProductZipName(productName, bundle.versionTag);
      downloadBlob(bundle.zipBlob, filename);
    } catch (err) {
      setError('Failed to download ZIP. Please try again.');
      console.error('ZIP download error:', err);
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    setError(null);
    try {
      const masterZipBlob = await buildAllProductsZip(bundles);
      const filename = generateAllProductsZipName();
      downloadBlob(masterZipBlob, filename);
    } catch (err) {
      setError('Failed to create master ZIP. Please try downloading products individually.');
      console.error('Master ZIP error:', err);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">Export Products</h1>
          <p className="text-base text-muted-foreground">
            Download your generated products individually or as a complete bundle
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button onClick={onBack} variant="outline" className="gap-2" aria-label="Back to Editor">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleDownloadAll}
            disabled={isDownloadingAll || bundles.length === 0}
            className="gap-2"
            aria-label="Download All Products"
          >
            {isDownloadingAll ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Package className="h-4 w-4" />
                Download All
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

      {/* Product Bundles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bundles.map((bundle) => {
          const productName = getProductName(bundle.productId);
          const coverPath = getCoverPath(bundle.productId);
          const pdfSize = formatFileSize(bundle.pdfBlob.size);
          const zipSize = formatFileSize(bundle.zipBlob.size);

          return (
            <Card key={bundle.productId} className="flex flex-col shadow-sm hover:shadow-lg transition-all duration-200 border-border/60 bg-gradient-to-br from-card via-card to-accent/5">
              <CardHeader className="space-y-4 pb-4">
                {coverPath && (
                  <div className="rounded-lg overflow-hidden bg-muted/50 border border-border/60 shadow-sm">
                    <img
                      src={coverPath}
                      alt={`${productName} cover`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <div className="space-y-1.5">
                  <CardTitle className="text-xl leading-tight">{productName}</CardTitle>
                  <CardDescription className="text-sm">
                    Version {bundle.versionTag}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4 pt-0">
                {/* File Info Table */}
                <div className="rounded-lg border border-border/60 bg-muted/30 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-border/60">
                        <TableHead className="font-semibold">File</TableHead>
                        <TableHead className="text-right font-semibold">Size</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-muted/50 border-border/60">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            PDF
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{pdfSize}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50 border-border/60">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileArchive className="h-4 w-4 text-primary" />
                            ZIP
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{zipSize}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Download Actions */}
                <div className="flex flex-col gap-2 mt-auto pt-2">
                  <Button
                    onClick={() => handleDownloadPdf(bundle)}
                    variant="outline"
                    className="w-full gap-2 border-border/60 hover:bg-accent/50"
                    aria-label={`Download ${productName} PDF`}
                  >
                    <FileText className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={() => handleDownloadZip(bundle)}
                    className="w-full gap-2 shadow-sm"
                    aria-label={`Download ${productName} ZIP`}
                  >
                    <FileArchive className="h-4 w-4" />
                    Download ZIP
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Instructions Panel */}
      <Card className="shadow-sm border-border/60 bg-gradient-to-br from-card via-muted/20 to-card">
        <CardHeader>
          <CardTitle className="text-xl">Getting Started</CardTitle>
          <CardDescription>
            Learn how to use and sell your digital products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <ExportInstructions />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
