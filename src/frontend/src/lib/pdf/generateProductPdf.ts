import type { ProductEntry } from '../../types/productEntry';
import { getJsPDF } from './jspdfClient';

export async function generateProductPdf(product: ProductEntry, coverBlob: Blob | null): Promise<Blob> {
  try {
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
    doc.text(product.name, margin, 40);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(product.subtitle, margin, 55);

    doc.setFontSize(12);
    const descLines = doc.splitTextToSize(product.description, contentWidth);
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

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${module.title}`, margin, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const moduleDescLines = doc.splitTextToSize(module.description, contentWidth);
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

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const promptLines = doc.splitTextToSize(`${index + 1}. ${prompt}`, contentWidth);
        doc.text(promptLines, margin, yPos);
        yPos += promptLines.length * 5 + 8;
      });
    }

    return doc.output('blob');
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
