import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Cart, CartItem } from '../backend';

const USER_ID_KEY = 'vanguard_user_id';

function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function useCart() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const userId = getUserId();

  const cartQuery = useQuery<Cart>({
    queryKey: ['cart', userId],
    queryFn: async () => {
      if (!actor) return { items: [] };
      try {
        return await actor.getCart(userId);
      } catch (err) {
        return { items: [] };
      }
    },
    enabled: !!actor && !isFetching,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (params: { productId: bigint; quantity: bigint; size: string; color: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addToCart(userId, params.productId, params.quantity, params.size, params.color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async (params: { productId: bigint; size: string; color: string; newQuantity: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      const cart = await actor.getCart(userId);
      const newItems = cart.items.filter(
        (item) =>
          !(item.productId === params.productId && item.size === params.size && item.color === params.color)
      );
      await actor.addToCart(userId, params.productId, params.newQuantity, params.size, params.color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (params: { productId: bigint; size: string; color: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      const cart = await actor.getCart(userId);
      const newItems = cart.items.filter(
        (item) =>
          !(item.productId === params.productId && item.size === params.size && item.color === params.color)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
  });

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    addToCart: addToCartMutation.mutateAsync,
    isAddingToCart: addToCartMutation.isPending,
    updateQuantity: (productId: bigint, size: string, color: string, newQuantity: bigint) =>
      updateQuantityMutation.mutateAsync({ productId, size, color, newQuantity }),
    removeFromCart: (productId: bigint, size: string, color: string) =>
      removeFromCartMutation.mutateAsync({ productId, size, color }),
  };
}
