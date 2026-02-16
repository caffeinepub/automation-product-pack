import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { generateProductBundle } from './generateProductBundle';

export async function generateAllBundles(
  products: ProductEntry[],
  onProgress?: (current: number, total: number) => void
): Promise<GeneratedBundle[]> {
  const bundles: GeneratedBundle[] = [];
  
  for (let i = 0; i < products.length; i++) {
    onProgress?.(i, products.length);
    const bundle = await generateProductBundle(products[i]);
    bundles.push(bundle);
  }
  
  onProgress?.(products.length, products.length);
  return bundles;
}
