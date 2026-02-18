import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ProductDefinition } from '../backend';

/**
 * Hook to fetch the three default products from the backend by their IDs.
 * Returns loading/error states and the fetched products.
 */
export function useBackendProducts() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<ProductDefinition[]>({
    queryKey: ['backendProducts'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      const productIds = [
        'digital_planner_mastery',
        'canva_templates_empire',
        'printable_wall_art_studio',
      ];

      try {
        const products = await Promise.all(
          productIds.map(id => actor.getProduct(id))
        );
        return products;
      } catch (error) {
        console.error('Failed to fetch backend products:', error);
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
