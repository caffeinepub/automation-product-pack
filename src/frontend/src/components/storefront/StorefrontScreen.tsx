import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { DEFAULT_PRODUCTS } from '../../lib/defaultProducts';
import StorefrontProductCard from './StorefrontProductCard';

interface StorefrontScreenProps {
  onEditProduct: (productId: string) => void;
  onBack: () => void;
}

export default function StorefrontScreen({ onEditProduct, onBack }: StorefrontScreenProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Product Storefront</h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Browse and manage your digital products
          </p>
        </div>
        <Button variant="outline" onClick={onBack} className="gap-2 self-start sm:self-auto">
          <ArrowLeft className="h-4 w-4" />
          Back to Editor
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {DEFAULT_PRODUCTS.map((product) => (
          <StorefrontProductCard
            key={product.id}
            product={product}
            onEdit={() => onEditProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
