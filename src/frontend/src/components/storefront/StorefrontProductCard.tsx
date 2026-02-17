import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { getCoverPath } from '../../lib/assets/covers';
import type { ProductEntry } from '../../types/productEntry';

interface StorefrontProductCardProps {
  product: ProductEntry;
  onEdit: () => void;
}

export default function StorefrontProductCard({ product, onEdit }: StorefrontProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const coverPath = getCoverPath(product.id);
  
  const shouldTruncate = product.description.length > 150;
  const displayDescription = isExpanded || !shouldTruncate 
    ? product.description 
    : `${product.description.slice(0, 150)}...`;

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 border-border/60 bg-gradient-to-br from-card via-card to-accent/5">
      {coverPath && (
        <div className="relative aspect-[5/8] w-full overflow-hidden border-b border-border/60 bg-muted/50">
          <img
            src={coverPath}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      
      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="text-xl font-semibold leading-tight tracking-tight">
          {product.name}
        </CardTitle>
        {product.subtitle && (
          <CardDescription className="text-sm font-medium leading-snug">
            {product.subtitle}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 space-y-3 pb-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {displayDescription}
        </p>
        {shouldTruncate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-auto gap-1.5 p-0 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/30"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-border/60 bg-gradient-to-r from-transparent via-accent/10 to-transparent">
        <Button onClick={onEdit} className="w-full gap-2 font-medium shadow-sm">
          <Edit className="h-4 w-4" />
          Edit Product
        </Button>
      </CardFooter>
    </Card>
  );
}
