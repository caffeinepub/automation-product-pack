import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import ProductEditor from './ProductEditor';
import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { loadDrafts, saveDrafts, resetDrafts } from '../../lib/localDrafts';
import { getDefaultProducts } from '../../lib/defaultProducts';
import { generateProductBundle } from '../../lib/generation/generateProductBundle';
import { generateAllBundles } from '../../lib/generation/generateAllBundles';
import { Loader2, AlertCircle, RotateCcw } from 'lucide-react';

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
  const [products, setProducts] = useState<ProductEntry[]>(getDefaultProducts());
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const drafts = loadDrafts();
    if (Object.keys(drafts).length > 0) {
      const defaultProducts = getDefaultProducts();
      const loaded = defaultProducts.map((p) => ({
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

  const handleRestoreDefaults = () => {
    resetDrafts();
    const freshDefaults = getDefaultProducts();
    setProducts(freshDefaults);
    setError(null);
    if (onActiveProductChange) {
      onActiveProductChange('product-1');
    }
  };

  const handleGenerateSingle = async (index: number) => {
    setError(null);
    setGeneratingIndex(index);
    try {
      const bundle = await generateProductBundle(products[index]);
      onBundlesGenerated([bundle]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      const productNumber = index + 1;
      
      if (errorMessage.includes('PDF')) {
        setError(
          `Failed to generate PDF for Product ${productNumber}. Please verify that the product name, subtitle, and description are filled in and try again.`
        );
      } else if (errorMessage.includes('ZIP')) {
        setError(
          `Failed to create ZIP file for Product ${productNumber}. Please try again.`
        );
      } else {
        setError(`Failed to generate Product ${productNumber}: ${errorMessage}`);
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
        setError('Failed to generate one or more PDFs. Please verify that all product names, subtitles, and descriptions are filled in and try again.');
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
    <div className="space-y-6 p-6 workspace-container bg-gradient-to-br from-accent/20 via-primary/15 to-accent/25 rounded-2xl border-2 border-primary/30 shadow-xl ring-4 ring-primary/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Editor</h2>
          <p className="text-muted-foreground">Configure your three digital products</p>
        </div>
        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Restore Defaults
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restore default products?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will replace all your current edits with the original three default products: Digital Planner Mastery, Canva Templates Empire, and Printable Wall Art Studio. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRestoreDefaults}>
                  Restore Defaults
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
