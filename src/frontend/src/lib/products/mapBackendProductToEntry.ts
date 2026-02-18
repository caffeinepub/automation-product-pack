import type { ProductDefinition } from '../../backend';
import type { ProductEntry } from '../../types/productEntry';
import { DEFAULT_PRODUCTS } from '../defaultProducts';

/**
 * Maps a backend ProductDefinition to a frontend ProductEntry,
 * merging with default product data to ensure all required fields are present.
 */
export function mapBackendProductToEntry(
  backendProduct: ProductDefinition,
  productIndex: number
): ProductEntry {
  // Get the corresponding default product for fallback values
  const defaultProduct = DEFAULT_PRODUCTS[productIndex];
  
  if (!defaultProduct) {
    throw new Error(`No default product found for index ${productIndex}`);
  }

  // Ensure required fields are non-empty by falling back to defaults
  const name = backendProduct.name?.trim() || defaultProduct.name;
  const subtitle = backendProduct.subtitle?.trim() || defaultProduct.subtitle;
  const description = backendProduct.description?.trim() || defaultProduct.description;

  // Merge backend data with default product structure
  return {
    ...defaultProduct, // Start with all default fields (modules, prompts, templates, checklists)
    name,
    subtitle,
    description,
  };
}

/**
 * Maps an array of backend products to frontend ProductEntry objects.
 */
export function mapBackendProductsToEntries(
  backendProducts: ProductDefinition[]
): ProductEntry[] {
  return backendProducts.map((product, index) => 
    mapBackendProductToEntry(product, index)
  );
}
