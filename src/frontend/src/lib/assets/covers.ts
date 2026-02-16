export const PRODUCT_COVERS = {
  'product-1': '/assets/generated/product-cover-1.dim_1600x2560.png',
  'product-2': '/assets/generated/product-cover-2.dim_1600x2560.png',
  'product-3': '/assets/generated/product-cover-3.dim_1600x2560.png',
} as const;

export function getCoverPath(productId: string): string {
  return PRODUCT_COVERS[productId as keyof typeof PRODUCT_COVERS] || '';
}

export async function fetchCoverAsBlob(productId: string): Promise<Blob | null> {
  try {
    const path = getCoverPath(productId);
    if (!path) return null;
    
    const response = await fetch(path);
    if (!response.ok) return null;
    
    return await response.blob();
  } catch (error) {
    console.error('Failed to fetch cover:', error);
    return null;
  }
}
