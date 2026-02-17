import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { getCoverPath } from '../../lib/assets/covers';
import { DEFAULT_PRODUCTS } from '../../lib/defaultProducts';
import PdfPreviewPanel from './PdfPreviewPanel';
import type { GeneratedBundle } from '../../types/productEntry';

interface UnifiedPreviewScreenProps {
  bundles: GeneratedBundle[];
  onBack: () => void;
}

export default function UnifiedPreviewScreen({ bundles, onBack }: UnifiedPreviewScreenProps) {
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  const toggleDescription = (productId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getBundleForProduct = (productId: string): GeneratedBundle | null => {
    return bundles.find(b => b.productId === productId) || null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Unified Preview</h1>
          <p className="text-muted-foreground mt-1">
            Preview all three products in one place
          </p>
        </div>
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {DEFAULT_PRODUCTS.map((product) => {
          const bundle = getBundleForProduct(product.id);
          const isExpanded = expandedDescriptions[product.id] || false;
          const coverPath = getCoverPath(product.id);
          const descriptionSnippet = product.description.length > 150
            ? product.description.substring(0, 150) + '...'
            : product.description;

          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                {coverPath && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={coverPath}
                      alt={`${product.name} cover`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <CardTitle className="text-xl">{product.name}</CardTitle>
                {product.subtitle && (
                  <CardDescription className="text-base font-medium">
                    {product.subtitle}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isExpanded ? product.description : descriptionSnippet}
                  </p>
                  {product.description.length > 150 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleDescription(product.id)}
                      className="mt-2 gap-1 h-auto p-0 text-primary hover:text-primary/80"
                    >
                      {isExpanded ? (
                        <>
                          Show less <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show more <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <PdfPreviewPanel
                    pdfBlob={bundle?.pdfBlob || null}
                    productName={product.name}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
