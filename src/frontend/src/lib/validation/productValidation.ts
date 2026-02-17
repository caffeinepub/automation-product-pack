/**
 * Product validation utilities for pre-generation checks.
 */

import type { ProductEntry } from '../../types/productEntry';

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
  message: string;
}

/**
 * Validates that required product fields are present and non-empty (after trimming).
 * Required fields: name, subtitle, description
 */
export function validateProductRequiredFields(product: ProductEntry): ValidationResult {
  const missingFields: string[] = [];

  // Check name
  if (!product.name || product.name.trim() === '') {
    missingFields.push('Product Name');
  }

  // Check subtitle
  if (!product.subtitle || product.subtitle.trim() === '') {
    missingFields.push('Subtitle');
  }

  // Check description
  if (!product.description || product.description.trim() === '') {
    missingFields.push('Description');
  }

  const isValid = missingFields.length === 0;
  const message = isValid
    ? 'All required fields are present'
    : `Missing required fields: ${missingFields.join(', ')}`;

  return {
    isValid,
    missingFields,
    message,
  };
}

/**
 * Validates all products and returns a summary of validation issues.
 */
export function validateAllProducts(products: ProductEntry[]): {
  isValid: boolean;
  invalidProducts: Array<{ productNumber: number; productName: string; missingFields: string[] }>;
  message: string;
} {
  const invalidProducts: Array<{ productNumber: number; productName: string; missingFields: string[] }> = [];

  products.forEach((product, index) => {
    const validation = validateProductRequiredFields(product);
    if (!validation.isValid) {
      invalidProducts.push({
        productNumber: index + 1,
        productName: product.name || `Product ${index + 1}`,
        missingFields: validation.missingFields,
      });
    }
  });

  const isValid = invalidProducts.length === 0;
  let message = '';

  if (!isValid) {
    if (invalidProducts.length === 1) {
      const invalid = invalidProducts[0];
      message = `Product ${invalid.productNumber} ("${invalid.productName}") is missing required fields: ${invalid.missingFields.join(', ')}. Please fill in all required fields before generating.`;
    } else {
      const productList = invalidProducts
        .map((p) => `Product ${p.productNumber} (${p.missingFields.join(', ')})`)
        .join('; ');
      message = `${invalidProducts.length} products have missing required fields: ${productList}. Please fill in all required fields before generating.`;
    }
  }

  return {
    isValid,
    invalidProducts,
    message,
  };
}
