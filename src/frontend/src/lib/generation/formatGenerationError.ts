import { GenerationError } from './generationErrors';
import { ProductDataValidationError } from './productDataErrors';

/**
 * Formats generation errors into clear, English-only user messages
 * with step and product context.
 */
export function formatGenerationError(error: unknown): string {
  // Handle ProductDataValidationError specifically
  if (error instanceof ProductDataValidationError) {
    const { productName, productNumber, missingFields } = error;
    return `Cannot generate PDF for "${productName}" (Product ${productNumber}). Missing required fields: ${missingFields.join(', ')}. Please fill in all required fields and try again.`;
  }
  
  if (error instanceof GenerationError) {
    const { step, productName, productNumber, originalError } = error;
    
    // Check if the original error is a ProductDataValidationError
    if (originalError instanceof ProductDataValidationError) {
      return `Cannot generate PDF for "${productName}" (Product ${productNumber}). Missing required fields: ${originalError.missingFields.join(', ')}. Please fill in all required fields and try again.`;
    }
    
    // Extract the original error message
    const originalMessage = originalError instanceof Error ? originalError.message : String(originalError);
    
    switch (step) {
      case 'library-check':
        return `The PDF library failed to initialize. Please refresh the page and try again. If the problem persists, check your internet connection or try clearing your browser cache.`;
      
      case 'cover':
        return `Failed to load cover image for "${productName}" (Product ${productNumber}). ${originalMessage}`;
      
      case 'pdf':
        // Check if it's a jsPDF library error
        if (originalMessage.includes('PDF library failed to load') || originalMessage.includes('jsPDF library not loaded')) {
          return `The PDF library failed to initialize for "${productName}" (Product ${productNumber}). Please refresh the page and try again. If the problem persists, check your internet connection.`;
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
    // Check for library loading errors
    if (error.message.includes('PDF library failed to load') || error.message.includes('jsPDF')) {
      return `The PDF library failed to initialize. Please refresh the page and try again. If the problem persists, check your internet connection or try clearing your browser cache.`;
    }
    return `Generation failed: ${error.message}`;
  }

  return 'An unknown error occurred during generation. Please try again.';
}

/**
 * Logs the full error details to console for troubleshooting.
 */
export function logGenerationError(error: unknown): void {
  if (error instanceof ProductDataValidationError) {
    console.error('Product data validation error:', {
      productId: error.productId,
      productName: error.productName,
      productNumber: error.productNumber,
      missingFields: error.missingFields,
      diagnosticSnapshot: error.diagnosticSnapshot,
    });
  } else if (error instanceof GenerationError) {
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
    
    // If the original error is a ProductDataValidationError, log its details too
    if (error.originalError instanceof ProductDataValidationError) {
      console.error('Original validation error details:', {
        missingFields: error.originalError.missingFields,
        diagnosticSnapshot: error.originalError.diagnosticSnapshot,
      });
    }
  } else {
    console.error('Generation error:', error);
  }
}
