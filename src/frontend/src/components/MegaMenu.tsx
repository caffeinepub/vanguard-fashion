import { Link } from '@tanstack/react-router';
import { ShoppingBag, Home, Sparkles, Heart } from 'lucide-react';
import { useMegaMenu } from '../hooks/useMegaMenu';

interface MegaMenuProps {
  onNavigate?: () => void;
}

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  const { activePanel, openPanel, closePanel, isOpen } = useMegaMenu();

  const handleLinkClick = () => {
    closePanel();
    onNavigate?.();
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-8">
        <div
          className="relative"
          onMouseEnter={() => openPanel('home')}
          onMouseLeave={closePanel}
        >
          <Link
            to="/"
            className="group relative text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-primary"
          >
            <span className="relative z-10">Home</span>
            <span className="absolute inset-0 -m-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 holographic-border" />
          </Link>

          {activePanel === 'home' && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-md">
              <div className="mega-menu-panel rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      Welcome
                    </h3>
                    <div className="space-y-3">
                      <Link
                        to="/"
                        onClick={handleLinkClick}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Homepage
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Discover our latest vanguardist fashion collections celebrating bold, creative designs.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Featured
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Empowering transwomen through artistic expression and inclusive fashion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => openPanel('products')}
          onMouseLeave={closePanel}
        >
          <Link
            to="/products"
            className="group relative text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-primary"
          >
            <span className="relative z-10">Shop</span>
            <span className="absolute inset-0 -m-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 holographic-border" />
          </Link>

          {activePanel === 'products' && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-2xl">
              <div className="mega-menu-panel rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      Collections
                    </h3>
                    <div className="space-y-3">
                      <Link
                        to="/products"
                        onClick={handleLinkClick}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        All Products
                      </Link>
                      <Link
                        to="/products"
                        onClick={handleLinkClick}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        New Arrivals
                      </Link>
                      <Link
                        to="/products"
                        onClick={handleLinkClick}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Best Sellers
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Categories
                    </h3>
                    <div className="space-y-3">
                      <Link
                        to="/products"
                        onClick={handleLinkClick}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Dresses
                      </Link>
                      <Link
                        to="/products"
                        onClick={handleLinkClick}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Jackets & Outerwear
                      </Link>
                      <Link
                        to="/products"
                        onClick={handleLinkClick}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Tops & Blouses
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    Vanguardist designs that empower and inspire. Each piece celebrates artistic expression and individuality.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
