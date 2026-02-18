import { useParams, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductGallery } from '../components/ProductGallery';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Skeleton } from '../components/ui/skeleton';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams({ from: '/product/$id' });
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(BigInt(id));
  const { addToCart, isAddingToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    if (!product) return;

    try {
      await addToCart({
        productId: product.id,
        quantity: BigInt(quantity),
        size: selectedSize,
        color: selectedColor,
      });
      toast.success('Added to cart!');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Product</h2>
          <p className="text-muted-foreground mb-6">{error.message}</p>
          <Button onClick={() => navigate({ to: '/products' })}>Back to Products</Button>
        </div>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate({ to: '/products' })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={product.imageUrls} productName={product.name} />

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-black text-[#a932bd]">
                ${(Number(product.price) / 100).toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="size" className="text-base font-semibold mb-2 block">
                  Size
                </Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size" className="w-full">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="color" className="text-base font-semibold mb-2 block">
                  Color
                </Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="color" className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity" className="text-base font-semibold mb-2 block">
                  Quantity
                </Label>
                <Select value={quantity.toString()} onValueChange={(val) => setQuantity(Number(val))}>
                  <SelectTrigger id="quantity" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-[#a932bd] hover:bg-[#8a2a9d] text-white font-bold text-lg py-6 rounded-full"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !selectedSize || !selectedColor}
            >
              {isAddingToCart ? (
                'Adding...'
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
