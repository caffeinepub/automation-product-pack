import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { generateProductPdf } from '../pdf/generateProductPdf';
import { buildProductZip } from '../zip/buildProductZip';
import { fetchCoverAsBlob } from '../assets/covers';
import { GenerationError } from './generationErrors';
import { generateProductPdfName } from '../filename';
import { isJsPDFAvailable } from '../pdf/jspdfClient';

export async function generateProductBundle(
  product: ProductEntry,
  productNumber: number
): Promise<GeneratedBundle> {
  const versionTag = `v${new Date().toISOString().split('T')[0]}`;

  try {
    // Step 0: Check if PDF library is available
    if (!isJsPDFAvailable()) {
      throw new GenerationError({
        step: 'library-check',
        productId: product.id,
        productName: product.name,
        productNumber,
        originalError: new Error('PDF library failed to load. The jsPDF library is not available. Please refresh the page and try again.'),
      });
    }

    // Step 1: Load cover image
    let coverBlob: Blob | null = null;
    try {
      coverBlob = await fetchCoverAsBlob(product.id);
    } catch (error) {
      throw new GenerationError({
        step: 'cover',
        productId: product.id,
        productName: product.name,
        productNumber,
        originalError: error,
      });
    }

    // Step 2: Generate PDF
    let pdfBlob: Blob;
    try {
      pdfBlob = await generateProductPdf(product, productNumber, coverBlob);
    } catch (error) {
      throw new GenerationError({
        step: 'pdf',
        productId: product.id,
        productName: product.name,
        productNumber,
        originalError: error,
      });
    }

    // Step 3: Build ZIP
    let zipBlob: Blob;
    try {
      const pdfFilename = generateProductPdfName(product.name, versionTag);
      zipBlob = await buildProductZip(product, pdfBlob, pdfFilename);
    } catch (error) {
      throw new GenerationError({
        step: 'zip',
        productId: product.id,
        productName: product.name,
        productNumber,
        originalError: error,
      });
    }

    return {
      productId: product.id,
      pdfBlob,
      zipBlob,
      generatedAt: new Date(),
      versionTag,
    };
  } catch (error) {
    // Re-throw if already a GenerationError
    if (error instanceof GenerationError) {
      throw error;
    }
    // Wrap any other errors
    throw new GenerationError({
      step: 'zip',
      productId: product.id,
      productName: product.name,
      productNumber,
      originalError: error,
    });
  }
}
