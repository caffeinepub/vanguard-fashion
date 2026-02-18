import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../backend';
import type { Product } from '../backend';
import { Button } from './ui/button';

interface CartItemProps {
  item: CartItemType;
  product: Product;
  onUpdateQuantity: (newQuantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, product, onUpdateQuantity, onRemove }: CartItemProps) {
  const imageUrl = product.imageUrls[0]?.getDirectURL() || '/assets/generated/product-dress.dim_800x1000.png';
  const quantity = Number(item.quantity);
  const price = Number(product.price);
  const total = (price * quantity) / 100;

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Size: {item.size} | Color: {item.color}
          </p>
          <p className="text-lg font-bold text-[#a932bd]">${(price / 100).toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold text-lg">${total.toFixed(2)}</p>
            <Button variant="ghost" size="icon" onClick={onRemove} className="text-destructive hover:text-destructive">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
