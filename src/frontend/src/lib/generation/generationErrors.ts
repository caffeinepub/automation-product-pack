/**
 * Typed generation error model that preserves root-cause details
 * while allowing clear user-facing messages.
 */

export type GenerationStep = 'cover' | 'pdf' | 'zip';

export interface GenerationErrorContext {
  step: GenerationStep;
  productId: string;
  productName: string;
  productNumber: number;
  originalError: Error | unknown;
}

export class GenerationError extends Error {
  public readonly step: GenerationStep;
  public readonly productId: string;
  public readonly productName: string;
  public readonly productNumber: number;
  public readonly originalError: Error | unknown;

  constructor(context: GenerationErrorContext) {
    const message = `Generation failed at ${context.step} step for ${context.productName}`;
    super(message);
    this.name = 'GenerationError';
    this.step = context.step;
    this.productId = context.productId;
    this.productName = context.productName;
    this.productNumber = context.productNumber;
    this.originalError = context.originalError;
  }
}
