import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { generateProductPdf } from '../pdf/generateProductPdf';
import { buildProductZip } from '../zip/buildProductZip';
import { generateProductPdfName, generateProductZipName } from '../filename';
import { fetchCoverAsBlob } from '../assets/covers';

export async function generateProductBundle(product: ProductEntry): Promise<GeneratedBundle> {
  try {
    const versionTag = new Date().toISOString().split('T')[0];
    
    // Fetch cover
    const coverBlob = await fetchCoverAsBlob(product.id);
    
    // Generate PDF
    let pdfBlob: Blob;
    try {
      pdfBlob = await generateProductPdf(product, coverBlob);
    } catch (error) {
      console.error('PDF generation failed:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`PDF generation failed: ${message}`);
    }
    
    const pdfFilename = generateProductPdfName(product.name, versionTag);
    
    // Build ZIP
    let zipBlob: Blob;
    try {
      zipBlob = await buildProductZip(product, pdfBlob, pdfFilename);
    } catch (error) {
      console.error('ZIP generation failed:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`ZIP generation failed: ${message}`);
    }
    
    return {
      productId: product.id,
      pdfBlob,
      zipBlob,
      generatedAt: new Date(),
      versionTag,
    };
  } catch (error) {
    console.error('Bundle generation error:', error);
    throw error;
  }
}
