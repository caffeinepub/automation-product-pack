import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ProductEditor from './ProductEditor';
import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { loadDrafts, saveDrafts } from '../../lib/localDrafts';
import { generateProductBundle } from '../../lib/generation/generateProductBundle';
import { generateAllBundles } from '../../lib/generation/generateAllBundles';
import { Loader2, AlertCircle } from 'lucide-react';

interface ProductsWorkspaceProps {
  onBundlesGenerated: (bundles: GeneratedBundle[]) => void;
}

const DEFAULT_PRODUCTS: ProductEntry[] = [
  {
    id: 'product-1',
    name: 'AI Automation Starter Pack',
    subtitle: 'Essential Tools & Prompts for Beginners',
    description: 'Get started with AI automation using our curated collection of prompts, templates, and step-by-step guides.',
    modules: [],
    prompts: [],
    templates: [],
    checklists: [],
  },
  {
    id: 'product-2',
    name: 'Workflow Optimization Blueprint',
    subtitle: 'Streamline Your Business Processes',
    description: 'Transform your daily operations with proven automation strategies and ready-to-use workflow templates.',
    modules: [],
    prompts: [],
    templates: [],
    checklists: [],
  },
  {
    id: 'product-3',
    name: 'Advanced AI Prompting Guide',
    subtitle: 'Master the Art of AI Communication',
    description: 'Unlock the full potential of AI tools with advanced prompting techniques and real-world examples.',
    modules: [],
    prompts: [],
    templates: [],
    checklists: [],
  },
];

export default function ProductsWorkspace({ onBundlesGenerated }: ProductsWorkspaceProps) {
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
      setError(`Failed to generate product: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
      setError(`Failed to generate products: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setGeneratingAll(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <Tabs defaultValue="product-1" className="w-full">
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
