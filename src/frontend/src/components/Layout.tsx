import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Button } from './ui/button';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cart?.items.reduce((sum, item) => sum + Number(item.quantity), 0) || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/tsgabrielle-logo (1).png"
                alt="TS Gabrielle"
                className="h-10 w-auto dark:hidden"
              />
              <img
                src="/assets/tsgabrielle-logo-white.png"
                alt="TS Gabrielle"
                className="h-10 w-auto hidden dark:block"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-sm font-semibold uppercase tracking-wider hover:text-[#a932bd] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-semibold uppercase tracking-wider hover:text-[#a932bd] transition-colors"
              >
                Shop
              </Link>
              <button
                onClick={() => navigate({ to: '/cart' })}
                className="relative p-2 hover:text-[#a932bd] transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#a932bd] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-border">
              <Link
                to="/"
                className="block text-sm font-semibold uppercase tracking-wider hover:text-[#a932bd] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-sm font-semibold uppercase tracking-wider hover:text-[#a932bd] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <button
                onClick={() => {
                  navigate({ to: '/cart' });
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-sm font-semibold uppercase tracking-wider hover:text-[#a932bd] transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Cart ({cartItemCount})</span>
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-muted/30 border-t border-border mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                src="/assets/tsgabrielle-logo (1).png"
                alt="TS Gabrielle"
                className="h-8 w-auto mb-4 dark:hidden"
              />
              <img
                src="/assets/tsgabrielle-logo-white.png"
                alt="TS Gabrielle"
                className="h-8 w-auto mb-4 hidden dark:block"
              />
              <p className="text-sm text-muted-foreground">
                Celebrating bold, creative fashion for transwomen. Vanguardist designs that empower and inspire.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-[#a932bd] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-[#a932bd] transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-[#a932bd] transition-colors">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">About</h4>
              <p className="text-sm text-muted-foreground">
                TS Gabrielle Fashion is dedicated to creating cutting-edge, artistic fashion that celebrates the beauty and strength of transwomen.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} TS Gabrielle Fashion. Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'tsgabrielle-fashion'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#a932bd] transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
