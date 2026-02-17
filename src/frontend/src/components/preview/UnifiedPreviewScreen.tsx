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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">Unified Preview</h1>
          <p className="text-base text-muted-foreground">
            Preview all three products in one place
          </p>
        </div>
        <Button onClick={onBack} variant="outline" className="gap-2 flex-shrink-0">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DEFAULT_PRODUCTS.map((product) => {
          const bundle = getBundleForProduct(product.id);
          const isExpanded = expandedDescriptions[product.id] || false;
          const coverPath = getCoverPath(product.id);
          const descriptionSnippet = product.description.length > 150
            ? product.description.substring(0, 150) + '...'
            : product.description;

          return (
            <Card key={product.id} className="flex flex-col shadow-sm hover:shadow-lg transition-all duration-200 border-border/60 bg-gradient-to-br from-card via-card to-accent/5">
              <CardHeader className="space-y-4 pb-4">
                {coverPath && (
                  <div className="rounded-lg overflow-hidden bg-muted/50 border border-border/60 shadow-sm">
                    <img
                      src={coverPath}
                      alt={`${product.name} cover`}
                      className="w-full aspect-[5/8] object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <CardTitle className="text-xl leading-tight">{product.name}</CardTitle>
                  {product.subtitle && (
                    <CardDescription className="text-base font-medium leading-snug">
                      {product.subtitle}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-5 pt-0">
                {/* Description */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isExpanded ? product.description : descriptionSnippet}
                  </p>
                  {product.description.length > 150 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleDescription(product.id)}
                      className="h-auto p-0 gap-1.5 text-primary hover:text-primary/80 font-medium hover:bg-accent/30"
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

                {/* PDF Preview */}
                <div className="pt-4 border-t border-border/60">
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
