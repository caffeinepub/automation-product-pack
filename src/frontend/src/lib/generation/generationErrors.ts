/**
 * Typed error model for generation failures.
 * Captures the step where the error occurred, product context, and the original error.
 */

export type GenerationStep = 'library-check' | 'cover' | 'pdf' | 'zip';

export interface GenerationErrorContext {
  step: GenerationStep;
  productId: string;
  productName: string;
  productNumber: number;
  originalError: unknown;
}

export class GenerationError extends Error {
  public readonly step: GenerationStep;
  public readonly productId: string;
  public readonly productName: string;
  public readonly productNumber: number;
  public readonly originalError: unknown;

  constructor(context: GenerationErrorContext) {
    const message = `Generation failed at step "${context.step}" for product "${context.productName}" (${context.productNumber})`;
    super(message);
    this.name = 'GenerationError';
    this.step = context.step;
    this.productId = context.productId;
    this.productName = context.productName;
    this.productNumber = context.productNumber;
    this.originalError = context.originalError;
  }
}
