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

export function getJsPDF() {
  if (typeof window === 'undefined') {
    throw new Error('jsPDF is only available in browser environment');
  }
  
  if (!window.jspdf || !window.jspdf.jsPDF) {
    throw new Error('jsPDF library not loaded. Please ensure the CDN script is included in index.html');
  }
  
  return window.jspdf.jsPDF;
}

export function createPdfDocument(options?: {
  orientation?: 'portrait' | 'landscape';
  unit?: 'mm' | 'pt' | 'px' | 'in' | 'cm';
  format?: string | number[];
}) {
  const jsPDF = getJsPDF();
  return new jsPDF(options);
}
