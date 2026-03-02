import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem(product, product.sizes[Math.floor(product.sizes.length / 2)]);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block verde-card-hover">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <div
          className="aspect-[3/4] flex items-center justify-center"
          style={{ backgroundColor: product.color }}
        >
          <span className="font-heading text-lg text-foreground/60 text-center px-4">
            {product.name}
          </span>
        </div>
        {!inStock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="bg-card px-3 py-1 rounded text-sm font-semibold text-foreground">
              Out of Stock
            </span>
          </div>
        )}
        {lowStock && (
          <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
            Only {product.stock} left
          </span>
        )}
        <Button
          onClick={handleQuickAdd}
          disabled={!inStock}
          size="sm"
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ShoppingBag className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground mt-0.5">£{product.price.toFixed(2)}</p>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.material}</p>
      {product.clickCollectAvailable && (
        <p className="text-xs text-primary mt-1">✓ Available for Click & Collect</p>
      )}
    </Link>
  );
}
