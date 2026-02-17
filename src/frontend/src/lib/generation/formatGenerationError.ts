import { GenerationError } from './generationErrors';

/**
 * Formats generation errors into clear, English-only user messages
 * with step and product context.
 */
export function formatGenerationError(error: unknown): string {
  if (error instanceof GenerationError) {
    const { step, productName, productNumber, originalError } = error;
    
    // Extract the original error message
    const originalMessage = originalError instanceof Error ? originalError.message : String(originalError);
    
    switch (step) {
      case 'cover':
        return `Failed to load cover image for "${productName}" (Product ${productNumber}). ${originalMessage}`;
      
      case 'pdf':
        // Check if it's a jsPDF library error
        if (originalMessage.includes('jsPDF library not loaded')) {
          return `Failed to generate PDF for "${productName}" (Product ${productNumber}). The PDF library failed to load. Please refresh the page and try again.`;
        }
        
        // Check if it's a validation error (missing fields)
        if (originalMessage.includes('Invalid product data') || originalMessage.includes('undefined') || originalMessage.includes('null')) {
          return `Failed to generate PDF for "${productName}" (Product ${productNumber}). Invalid product data detected. Please ensure all required fields (Product Name, Subtitle, Description) are filled in.`;
        }
        
        // Generic PDF error with original message
        return `Failed to generate PDF for "${productName}" (Product ${productNumber}). ${originalMessage}`;
      
      case 'zip':
        return `Failed to create ZIP file for "${productName}" (Product ${productNumber}). ${originalMessage}`;
      
      default:
        return `Failed to generate "${productName}" (Product ${productNumber}). ${originalMessage}`;
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
