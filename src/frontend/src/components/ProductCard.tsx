import { useNavigate } from '@tanstack/react-router';
import type { Product } from '../backend';
import { Card, CardContent } from './ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const imageUrl = product.imageUrls[0]?.getDirectURL() || '/assets/generated/product-dress.dim_800x1000.png';

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#a932bd] transition-all duration-300 hover:shadow-xl hover:shadow-[#a932bd]/20"
      onClick={() => navigate({ to: '/product/$id', params: { id: product.id.toString() } })}
    >
      <CardContent className="p-0">
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 group-hover:text-[#a932bd] transition-colors">
            {product.name}
          </h3>
          <p className="text-2xl font-black tracking-tight text-[#a932bd]">
            ${(Number(product.price) / 100).toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
