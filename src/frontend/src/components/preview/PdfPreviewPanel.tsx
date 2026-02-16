import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { FileText, AlertCircle } from 'lucide-react';

interface PdfPreviewPanelProps {
  pdfBlob: Blob | null;
  productName: string;
}

export default function PdfPreviewPanel({ pdfBlob, productName }: PdfPreviewPanelProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [pdfBlob]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">PDF Preview</CardTitle>
        <CardDescription>Preview of the generated PDF document</CardDescription>
      </CardHeader>
      <CardContent>
        {previewUrl ? (
          <div className="border rounded-lg overflow-hidden bg-muted">
            <iframe
              src={previewUrl}
              className="w-full h-[400px]"
              title={`${productName} PDF Preview`}
            />
          </div>
        ) : (
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              Generate the product to see a PDF preview
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
