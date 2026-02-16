import type { ProductEntry } from '../../types/productEntry';
import { fetchCoverAsBlob } from '../assets/covers';

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

  // Add README
  const readme = generateReadme(product);
  zip.file('README.md', readme);

  return await zip.generateAsync({ type: 'blob' });
}

function generateReadme(product: ProductEntry): string {
  return `# ${product.name}

${product.subtitle}

## Description

${product.description}

## Contents

- **PDF Guide**: Complete product documentation
- **Cover Image**: Product branding asset
${product.templates.length > 0 ? `- **Templates**: ${product.templates.length} ready-to-use templates\n` : ''}${product.checklists.length > 0 ? `- **Checklists**: ${product.checklists.length} actionable checklists\n` : ''}${product.prompts.length > 0 ? `- **AI Prompts**: ${product.prompts.length} curated prompts\n` : ''}
## Modules

${product.modules.map((m, i) => `${i + 1}. **${m.title}**: ${m.description}`).join('\n')}

---

Generated on ${new Date().toLocaleDateString()}
`;
}
