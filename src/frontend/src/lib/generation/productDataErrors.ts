/**
 * Typed error for product data validation failures during PDF generation.
 * Captures product context and specific missing fields for clear error messaging.
 */
export class ProductDataValidationError extends Error {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly productNumber: number,
    public readonly missingFields: string[],
    public readonly diagnosticSnapshot: Record<string, any>
  ) {
    super(`Product data validation failed for "${productName}" (Product ${productNumber}): Missing ${missingFields.join(', ')}`);
    this.name = 'ProductDataValidationError';
  }
}
