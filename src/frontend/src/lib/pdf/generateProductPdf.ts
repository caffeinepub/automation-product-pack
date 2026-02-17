import type { ProductEntry } from '../../types/productEntry';
import { getJsPDF } from './jspdfClient';

/**
 * Normalizes a value to a string, throwing an error if it's invalid.
 */
function normalizeToString(value: any, fieldName: string): string {
  if (value === undefined || value === null) {
    throw new Error(`Invalid product data: ${fieldName} is ${value === null ? 'null' : 'undefined'}`);
  }
  
  const str = String(value);
  if (str.trim() === '') {
    console.warn(`Warning: ${fieldName} is empty or whitespace-only`);
  }
  
  return str;
}

export async function generateProductPdf(product: ProductEntry, coverBlob: Blob | null): Promise<Blob> {
  try {
    // Validate and normalize required product fields
    const productName = normalizeToString(product.name, 'product.name');
    const productSubtitle = normalizeToString(product.subtitle, 'product.subtitle');
    const productDescription = normalizeToString(product.description, 'product.description');
    
    console.log('Generating PDF for product:', {
      name: productName,
      subtitle: productSubtitle,
      descriptionLength: productDescription.length,
    });
    
    const jsPDF = getJsPDF();
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Cover page with image if available
    if (coverBlob) {
      try {
        const imageData = await blobToDataURL(coverBlob);
        const imgWidth = pageWidth;
        const imgHeight = pageHeight;
        doc.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.addPage();
      } catch (error) {
        console.error('Failed to add cover image:', error);
      }
    }

    // Title page
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(productName, margin, 40);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(productSubtitle, margin, 55);

    doc.setFontSize(12);
    const descLines = doc.splitTextToSize(productDescription, contentWidth);
    doc.text(descLines, margin, 75);

    // Modules section
    if (product.modules.length > 0) {
      doc.addPage();
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Modules & Chapters', margin, 30);

      let yPos = 45;
      product.modules.forEach((module, index) => {
        if (yPos > pageHeight - 40) {
          doc.addPage();
          yPos = 30;
        }

        // Normalize module fields
        const moduleTitle = String(module.title || '');
        const moduleDescription = String(module.description || '');

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${moduleTitle}`, margin, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const moduleDescLines = doc.splitTextToSize(moduleDescription, contentWidth);
        doc.text(moduleDescLines, margin + 5, yPos);
        yPos += moduleDescLines.length * 5 + 10;
      });
    }

    // Prompts section
    if (product.prompts.length > 0) {
      doc.addPage();
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('AI Prompts', margin, 30);

      let yPos = 45;
      product.prompts.forEach((prompt, index) => {
        if (yPos > pageHeight - 40) {
          doc.addPage();
          yPos = 30;
        }

        // Normalize prompt
        const promptText = String(prompt || '');

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const promptLines = doc.splitTextToSize(`${index + 1}. ${promptText}`, contentWidth);
        doc.text(promptLines, margin, yPos);
        yPos += promptLines.length * 5 + 8;
      });
    }

    return doc.output('blob');
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
