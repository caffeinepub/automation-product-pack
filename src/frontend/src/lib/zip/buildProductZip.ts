import type { ProductEntry } from '../../types/productEntry';
import { fetchCoverAsBlob } from '../assets/covers';
import { getProductReadmeContent } from './readmeContent';

// Type definitions for JSZip
declare global {
  interface Window {
    JSZip: any;
  }
}

export async function buildProductZip(
  product: ProductEntry,
  pdfBlob: Blob,
  pdfFilename: string
): Promise<Blob> {
  // Access JSZip from global window object (loaded via CDN)
  const JSZip = window.JSZip;
  const zip = new JSZip();

  // Add PDF
  zip.file(pdfFilename, pdfBlob);

  // Add cover image
  const coverBlob = await fetchCoverAsBlob(product.id);
  if (coverBlob) {
    const ext = 'png';
    zip.file(`cover.${ext}`, coverBlob);
  }

  // Add templates
  if (product.templates.length > 0) {
    const templatesFolder = zip.folder('templates');
    product.templates.forEach((template, index) => {
      templatesFolder?.file(`template-${index + 1}.txt`, template);
    });
  }

  // Add checklists
  if (product.checklists.length > 0) {
    const checklistsFolder = zip.folder('checklists');
    product.checklists.forEach((checklist, index) => {
      checklistsFolder?.file(`checklist-${index + 1}.md`, checklist);
    });
  }

  // Add prompts
  if (product.prompts.length > 0) {
    const promptsFolder = zip.folder('prompts');
    product.prompts.forEach((prompt, index) => {
      promptsFolder?.file(`prompt-${index + 1}.txt`, prompt);
    });
  }

  // Add comprehensive README with usage and upload instructions
  const readme = getProductReadmeContent(
    product.name,
    product.subtitle,
    product.description,
    product.modules,
    product.templates.length,
    product.checklists.length,
    product.prompts.length
  );
  zip.file('README.md', readme);

  return await zip.generateAsync({ type: 'blob' });
}
