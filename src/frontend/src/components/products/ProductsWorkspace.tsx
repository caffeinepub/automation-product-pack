import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ProductEditor from './ProductEditor';
import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { loadDrafts, saveDrafts } from '../../lib/localDrafts';
import { DEFAULT_PRODUCTS } from '../../lib/defaultProducts';
import { generateProductBundle } from '../../lib/generation/generateProductBundle';
import { generateAllBundles } from '../../lib/generation/generateAllBundles';
import { Loader2, AlertCircle } from 'lucide-react';

interface ProductsWorkspaceProps {
  onBundlesGenerated: (bundles: GeneratedBundle[]) => void;
  activeProductId?: string;
  onActiveProductChange?: (productId: string) => void;
}

export default function ProductsWorkspace({ 
  onBundlesGenerated,
  activeProductId = 'product-1',
  onActiveProductChange,
}: ProductsWorkspaceProps) {
  const [products, setProducts] = useState<ProductEntry[]>(DEFAULT_PRODUCTS);
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const drafts = loadDrafts();
    if (Object.keys(drafts).length > 0) {
      const loaded = DEFAULT_PRODUCTS.map((p) => ({
        ...p,
        ...drafts[p.id],
      }));
      setProducts(loaded);
    }
  }, []);

  useEffect(() => {
    const drafts = products.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as Record<string, ProductEntry>);
    saveDrafts(drafts);
  }, [products]);

  const updateProduct = (index: number, updated: ProductEntry) => {
    const newProducts = [...products];
    newProducts[index] = updated;
    setProducts(newProducts);
  };

  const handleGenerateSingle = async (index: number) => {
    setError(null);
    setGeneratingIndex(index);
    try {
      const bundle = await generateProductBundle(products[index]);
      onBundlesGenerated([bundle]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      if (errorMessage.includes('PDF')) {
        setError(`Failed to generate PDF for product ${index + 1}. Please check your content and try again.`);
      } else if (errorMessage.includes('ZIP')) {
        setError(`Failed to create ZIP file for product ${index + 1}. Please try again.`);
      } else {
        setError(`Failed to generate product ${index + 1}: ${errorMessage}`);
      }
      console.error('Generation error:', err);
    } finally {
      setGeneratingIndex(null);
    }
  };

  const handleGenerateAll = async () => {
    setError(null);
    setGeneratingAll(true);
    try {
      const bundles = await generateAllBundles(products);
      onBundlesGenerated(bundles);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      if (errorMessage.includes('PDF')) {
        setError('Failed to generate one or more PDFs. Please check your product content and try again.');
      } else if (errorMessage.includes('ZIP')) {
        setError('Failed to create ZIP files. Please try again.');
      } else {
        setError(`Failed to generate products: ${errorMessage}`);
      }
      console.error('Generation error:', err);
    } finally {
      setGeneratingAll(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Editor</h2>
          <p className="text-muted-foreground">Configure your three digital products</p>
        </div>
        <Button onClick={handleGenerateAll} disabled={generatingAll} size="lg">
          {generatingAll ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating All...
            </>
          ) : (
            'Generate All Products'
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs 
        value={activeProductId} 
        onValueChange={onActiveProductChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="product-1">Product 1</TabsTrigger>
          <TabsTrigger value="product-2">Product 2</TabsTrigger>
          <TabsTrigger value="product-3">Product 3</TabsTrigger>
        </TabsList>

        {products.map((product, index) => (
          <TabsContent key={product.id} value={product.id}>
            <ProductEditor
              product={product}
              onChange={(updated) => updateProduct(index, updated)}
              onGenerate={() => handleGenerateSingle(index)}
              isGenerating={generatingIndex === index || generatingAll}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
