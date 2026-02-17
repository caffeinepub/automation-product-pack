import { GenerationError } from './generationErrors';

/**
 * Formats generation errors into clear, English-only user messages
 * with step and product context.
 */
export function formatGenerationError(error: unknown): string {
  if (error instanceof GenerationError) {
    const { step, productName, productNumber } = error;
    
    switch (step) {
      case 'cover':
        return `Failed to load cover image for "${productName}" (Product ${productNumber}). Please try again.`;
      case 'pdf':
        return `Failed to generate PDF for "${productName}" (Product ${productNumber}). Please verify that the product name, subtitle, and description are filled in and try again.`;
      case 'zip':
        return `Failed to create ZIP file for "${productName}" (Product ${productNumber}). Please try again.`;
      default:
        return `Failed to generate "${productName}" (Product ${productNumber}). Please try again.`;
    }
  }

  // Fallback for non-GenerationError errors
  if (error instanceof Error) {
    return `Generation failed: ${error.message}`;
  }

  return 'An unknown error occurred during generation. Please try again.';
}

/**
 * Logs the full error details to console for troubleshooting.
 */
export function logGenerationError(error: unknown): void {
  if (error instanceof GenerationError) {
    console.error('Generation error details:', {
      step: error.step,
      productId: error.productId,
      productName: error.productName,
      productNumber: error.productNumber,
      originalError: error.originalError,
    });
    
    // Log the original error stack if available
    if (error.originalError instanceof Error) {
      console.error('Original error stack:', error.originalError.stack);
    }
  } else {
    console.error('Generation error:', error);
  }
}
