import type { ProductEntry, GeneratedBundle } from '../../types/productEntry';
import { generateProductPdf } from '../pdf/generateProductPdf';
import { buildProductZip } from '../zip/buildProductZip';
import { generateProductPdfName, generateProductZipName } from '../filename';
import { fetchCoverAsBlob } from '../assets/covers';

export async function generateProductBundle(product: ProductEntry): Promise<GeneratedBundle> {
  const versionTag = new Date().toISOString().split('T')[0];
  
  // Fetch cover
  const coverBlob = await fetchCoverAsBlob(product.id);
  
  // Generate PDF
  const pdfBlob = await generateProductPdf(product, coverBlob);
  const pdfFilename = generateProductPdfName(product.name, versionTag);
  
  // Build ZIP
  const zipBlob = await buildProductZip(product, pdfBlob, pdfFilename);
  
  return {
    productId: product.id,
    pdfBlob,
    zipBlob,
    generatedAt: new Date(),
    versionTag,
  };
}
