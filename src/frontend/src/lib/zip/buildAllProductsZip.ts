import type { GeneratedBundle } from '../../types/productEntry';
import { generateProductZipName } from '../filename';
import { getMasterReadmeContent } from './readmeContent';

// Type definitions for JSZip
declare global {
  interface Window {
    JSZip: any;
  }
}

export async function buildAllProductsZip(bundles: GeneratedBundle[]): Promise<Blob> {
  // Access JSZip from global window object (loaded via CDN)
  const JSZip = window.JSZip;
  const zip = new JSZip();

  for (const bundle of bundles) {
    const productFolder = zip.folder(`product-${bundle.productId}`);
    if (productFolder) {
      const zipName = generateProductZipName(`product-${bundle.productId}`, bundle.versionTag);
      productFolder.file(zipName, bundle.zipBlob);
    }
  }

  // Add comprehensive master README with consolidated upload instructions
  const readme = getMasterReadmeContent(bundles);
  zip.file('README.md', readme);

  return await zip.generateAsync({ type: 'blob' });
}
