import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product } from '../backend';

export function useProducts() {
  const { actor, isFetching } = useActor();

  const query = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  return {
    products: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useProduct(id: bigint) {
  const { actor, isFetching } = useActor();

  const query = useQuery<Product>({
    queryKey: ['product', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
