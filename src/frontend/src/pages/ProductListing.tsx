import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Skeleton } from '../components/ui/skeleton';

export default function ProductListing() {
  const { products, isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Products</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover bold, artistic fashion designed to celebrate your authentic self
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id.toString()} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
