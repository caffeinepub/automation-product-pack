export interface ProductModule {
  id: string;
  title: string;
  description: string;
}

export interface ProductEntry {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  modules: ProductModule[];
  prompts: string[];
  templates: string[];
  checklists: string[];
  brandingColor?: string;
  generationState?: {
    isGenerating: boolean;
    lastGenerated?: Date;
    versionTag?: string;
  };
}

export interface GeneratedBundle {
  productId: string;
  pdfBlob: Blob;
  zipBlob: Blob;
  generatedAt: Date;
  versionTag: string;
}
