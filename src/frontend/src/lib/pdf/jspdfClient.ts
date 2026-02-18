/**
 * Wrapper module for jsPDF loaded from CDN.
 * Provides a stable API for PDF generation with proper error handling.
 */

// Type definitions for jsPDF loaded from CDN
declare global {
  interface Window {
    jspdf?: {
      jsPDF: any;
    };
  }
}

/**
 * Checks if the jsPDF library is available.
 * Returns true if loaded, false otherwise.
 */
export function isJsPDFAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return !!(window.jspdf && window.jspdf.jsPDF);
}

/**
 * Gets the jsPDF constructor from the global window object.
 * Throws an error if the library is not loaded.
 */
export function getJsPDF() {
  if (typeof window === 'undefined') {
    throw new Error('jsPDF is only available in browser environment');
  }
  
  if (!window.jspdf || !window.jspdf.jsPDF) {
    throw new Error('PDF library failed to load. The jsPDF library is not available. Please refresh the page and try again. If the problem persists, check your internet connection.');
  }
  
  return window.jspdf.jsPDF;
}

/**
 * Creates a new PDF document with the specified options.
 */
export function createPdfDocument(options?: {
  orientation?: 'portrait' | 'landscape';
  unit?: 'mm' | 'pt' | 'px' | 'in' | 'cm';
  format?: string | number[];
}) {
  const jsPDF = getJsPDF();
  return new jsPDF(options);
}
