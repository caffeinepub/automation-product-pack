export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateSafeFilename(productName: string, extension: string, versionTag?: string): string {
  const slug = slugify(productName);
  const date = new Date().toISOString().split('T')[0];
  const version = versionTag || date;
  return `${slug}-${version}.${extension}`;
}

export function generateProductZipName(productName: string, versionTag?: string): string {
  return generateSafeFilename(productName, 'zip', versionTag);
}

export function generateProductPdfName(productName: string, versionTag?: string): string {
  return generateSafeFilename(productName, 'pdf', versionTag);
}

export function generateAllProductsZipName(): string {
  const date = new Date().toISOString().split('T')[0];
  return `automation-products-bundle-${date}.zip`;
}
