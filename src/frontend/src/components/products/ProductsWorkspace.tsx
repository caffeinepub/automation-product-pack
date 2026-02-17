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
import { formatGenerationError, logGenerationError } from '../../lib/generation/formatGenerationError';
import { validateProductRequiredFields, validateAllProducts } from '../../lib/validation/productValidation';
import { useIsCallerAdmin, usePopulateDefaultProducts } from '../../hooks/usePopulateDefaultProducts';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Loader2, AlertCircle, RotateCcw, Database } from 'lucide-react';

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const populateDefaultProducts = usePopulateDefaultProducts();

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
    setSuccessMessage(null);
    if (onActiveProductChange) {
      onActiveProductChange('product-1');
    }
  };

  const handlePopulateBackendProducts = async () => {
    setError(null);
    setSuccessMessage(null);
    
    try {
      await populateDefaultProducts.mutateAsync();
      
      // On success, restore local editor state
      resetDrafts();
      const freshDefaults = getDefaultProducts();
      setProducts(freshDefaults);
      if (onActiveProductChange) {
        onActiveProductChange('product-1');
      }
      
      setSuccessMessage('Default products successfully repopulated in the backend. Editor has been reset to default products.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      if (errorMessage.includes('Unauthorized')) {
        setError('Unauthorized: Only admins can repopulate default products.');
      } else {
        setError(`Failed to repopulate default products: ${errorMessage}`);
      }
      console.error('Repopulate error:', err);
    }
  };

  const handleGenerateSingle = async (index: number) => {
    setError(null);
    setSuccessMessage(null);
    
    // Pre-validate product fields
    const product = products[index];
    const validation = validateProductRequiredFields(product);
    
    if (!validation.isValid) {
      setError(`Cannot generate Product ${index + 1} ("${product.name || 'Untitled'}"): ${validation.message}`);
      return;
    }
    
    setGeneratingIndex(index);
    try {
      const bundle = await generateProductBundle(product, index + 1);
      onBundlesGenerated([bundle]);
    } catch (err) {
      const errorMessage = formatGenerationError(err);
      setError(errorMessage);
      logGenerationError(err);
    } finally {
      setGeneratingIndex(null);
    }
  };

  const handleGenerateAll = async () => {
    setError(null);
    setSuccessMessage(null);
    
    // Pre-validate all products
    const validation = validateAllProducts(products);
    
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }
    
    setGeneratingAll(true);
    try {
      const bundles = await generateAllBundles(products);
      onBundlesGenerated(bundles);
    } catch (err) {
      const errorMessage = formatGenerationError(err);
      setError(errorMessage);
      logGenerationError(err);
    } finally {
      setGeneratingAll(false);
    }
  };

  const showAdminButton = !!identity && isAdmin === true;

  return (
    <div className="space-y-6 p-6 workspace-container bg-gradient-to-br from-accent/20 via-primary/15 to-accent/25 rounded-2xl border-2 border-primary/30 shadow-xl ring-4 ring-primary/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Editor</h2>
          <p className="text-muted-foreground">Configure your three digital products</p>
        </div>
        <div className="flex gap-3">
          {showAdminButton && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  disabled={populateDefaultProducts.isPending}
                >
                  {populateDefaultProducts.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Repopulating...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Repopulate Default Products
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Repopulate default products in backend?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset the backend product database to the three default products and restore your local editor to the default state. This is useful after deployment to ensure the backend has the correct product data. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePopulateBackendProducts}>
                    Repopulate Products
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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
                  This will replace all current product data with the default products. This action cannot be undone.
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
          <Button 
            onClick={handleGenerateAll}
            disabled={generatingAll || generatingIndex !== null}
            size="lg"
          >
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

      {successMessage && (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeProductId} onValueChange={onActiveProductChange}>
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
              isGenerating={generatingIndex === index}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
