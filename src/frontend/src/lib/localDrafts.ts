const STORAGE_KEY = 'automation-product-drafts-v2';
const STORAGE_VERSION = '2.0';

export interface DraftsStorage {
  version: string;
  products: Record<string, any>;
  lastSaved: string;
}

export function loadDrafts(): Record<string, any> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    
    const data: DraftsStorage = JSON.parse(stored);
    
    // Version check - return empty if version mismatch
    if (data.version !== STORAGE_VERSION) {
      console.warn('Draft version mismatch, starting fresh with new defaults');
      return {};
    }
    
    return data.products || {};
  } catch (error) {
    console.error('Failed to load drafts:', error);
    return {};
  }
}

export function saveDrafts(products: Record<string, any>): void {
  try {
    const data: DraftsStorage = {
      version: STORAGE_VERSION,
      products,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save drafts:', error);
  }
}

export function resetDrafts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset drafts:', error);
  }
}
