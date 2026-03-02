import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, MapPin, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/membership', label: 'Membership' },
  { to: '/store-locator', label: 'Stores' },
  { to: '/returns', label: 'Returns' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top banner */}
      <div className="verde-gradient text-primary-foreground text-center py-2 px-4 text-sm font-body tracking-wide">
        🌿 Use code <span className="font-semibold">WELCOME10</span> for 10% off your first order — Online & In-Store
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground tracking-tight">
              Verde Boutique
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="text-foreground hover:text-primary transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-card border-t border-border px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium py-1 ${
                  location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5" />
                <span className="font-heading text-lg font-bold">Verde Boutique</span>
              </div>
              <p className="text-sm opacity-80">
                Sustainable Style. Seamlessly Connected. Fashion that cares for the planet.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Shop</h4>
              <div className="space-y-2 text-sm opacity-80">
                <Link to="/shop?category=women" className="block hover:opacity-100">Women</Link>
                <Link to="/shop?category=men" className="block hover:opacity-100">Men</Link>
                <Link to="/shop?category=activewear" className="block hover:opacity-100">Activewear</Link>
                <Link to="/shop?category=accessories" className="block hover:opacity-100">Accessories</Link>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Support</h4>
              <div className="space-y-2 text-sm opacity-80">
                <Link to="/returns" className="block hover:opacity-100">Returns & Exchanges</Link>
                <Link to="/store-locator" className="block hover:opacity-100">Store Locator</Link>
                <Link to="/membership" className="block hover:opacity-100">Membership</Link>
                <Link to="/login" className="block hover:opacity-100">My Account</Link>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Our Promise</h4>
              <p className="text-sm opacity-80">
                Every piece in our collection is ethically sourced and sustainably made. We believe fashion should look good and do good.
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
            © 2026 Verde Boutique. All rights reserved. | Academic Demonstration Project
          </div>
        </div>
      </footer>
    </div>
  );
}
