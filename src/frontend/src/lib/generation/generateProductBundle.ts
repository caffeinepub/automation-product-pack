import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { generateProductPdf } from '../pdf/generateProductPdf';
import { buildProductZip } from '../zip/buildProductZip';
import { generateProductPdfName, generateProductZipName } from '../filename';
import { fetchCoverAsBlob } from '../assets/covers';
import { GenerationError } from './generationErrors';

export async function generateProductBundle(
  product: ProductEntry,
  productNumber: number = 1
): Promise<GeneratedBundle> {
  const versionTag = new Date().toISOString().split('T')[0];
  
  // Fetch cover
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
  
  // Generate PDF
  let pdfBlob: Blob;
  try {
    pdfBlob = await generateProductPdf(product, coverBlob);
  } catch (error) {
    throw new GenerationError({
      step: 'pdf',
      productId: product.id,
      productName: product.name,
      productNumber,
      originalError: error,
    });
  }
  
  const pdfFilename = generateProductPdfName(product.name, versionTag);
  
  // Build ZIP
  let zipBlob: Blob;
  try {
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
}
