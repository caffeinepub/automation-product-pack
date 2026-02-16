import type { GeneratedBundle } from '../../types/productEntry';
import { generateProductZipName } from '../filename';

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

  // Add master README
  const readme = `# Automation Products Bundle

This bundle contains ${bundles.length} complete digital products.

## Contents

${bundles.map((b, i) => `${i + 1}. Product ${b.productId} (Generated: ${b.generatedAt.toLocaleDateString()})`).join('\n')}

Each product folder contains a complete ZIP with:
- PDF documentation
- Cover image
- Templates, checklists, and AI prompts

---

Bundle created on ${new Date().toLocaleDateString()}
`;

  zip.file('README.md', readme);

  return await zip.generateAsync({ type: 'blob' });
}
