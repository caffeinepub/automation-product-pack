/**
 * Wrapper module for JSZip loaded from CDN.
 * Provides a stable API for ZIP creation with proper error handling.
 */

// Type definitions for JSZip loaded from CDN
declare global {
  interface Window {
    JSZip?: any;
  }
}

export function getJSZip() {
  if (typeof window === 'undefined') {
    throw new Error('JSZip is only available in browser environment');
  }
  
  if (!window.JSZip) {
    throw new Error('JSZip library not loaded. Please ensure the CDN script is included in index.html');
  }
  
  return window.JSZip;
}

export function createZip() {
  const JSZip = getJSZip();
  return new JSZip();
}
