import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();
  const { products } = useProducts();

  const handleUpdateQuantity = async (productId: bigint, size: string, color: string, newQuantity: number) => {
    try {
      await updateQuantity(productId, size, color, BigInt(newQuantity));
    } catch (err) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (productId: bigint, size: string, color: string) => {
    try {
      await removeFromCart(productId, size, color);
      toast.success('Item removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const getProduct = (productId: bigint) => {
    return products?.find((p) => p.id === productId);
  };

  const calculateTotal = () => {
    if (!cart || !products) return 0;
    return cart.items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      if (!product) return sum;
      return sum + (Number(product.price) * Number(item.quantity)) / 100;
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate({ to: '/products' })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
        </Button>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">Shopping Cart</h1>

        {isEmpty ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/30 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Discover our vanguardist collection and add some bold pieces to your wardrobe.
            </p>
            <Button
              size="lg"
              className="bg-[#a932bd] hover:bg-[#8a2a9d] text-white font-bold rounded-full"
              onClick={() => navigate({ to: '/products' })}
            >
              Explore Collection
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                {cart.items.map((item, index) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <CartItem
                      key={`${item.productId}-${item.size}-${item.color}-${index}`}
                      item={item}
                      product={product}
                      onUpdateQuantity={(newQuantity) =>
                        handleUpdateQuantity(item.productId, item.size, item.color, newQuantity)
                      }
                      onRemove={() => handleRemove(item.productId, item.size, item.color)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-2xl font-black">
                      <span>Total</span>
                      <span className="text-[#a932bd]">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-[#a932bd] hover:bg-[#8a2a9d] text-white font-bold text-lg py-6 rounded-full"
                  onClick={() => toast.info('Checkout coming soon!')}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
