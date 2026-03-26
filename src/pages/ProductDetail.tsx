import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Truck, Store, Leaf, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products } = useInventory();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl text-foreground mb-4">Product not found</h1>
        <Link to="/shop"><Button variant="outline">Back to Shop</Button></Link>
      </div>
    );
  }

  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, selectedSize);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: product.color }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="aspect-square flex items-center justify-center p-8">
              <span className="font-heading text-2xl text-foreground/50 text-center">{product.name}</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-foreground mb-4">£{product.price.toFixed(2)}</p>
          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Stock */}
          <div className="mb-6">
            {inStock ? (
              <span className="text-sm text-primary flex items-center gap-1">
                <Check className="h-4 w-4" /> In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm text-destructive">Out of Stock</span>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <Button onClick={handleAddToCart} disabled={!inStock} size="lg" className="w-full gap-2 mb-6">
            <ShoppingBag className="h-5 w-5" /> Add to Cart
          </Button>

          {/* Delivery Info */}
          <div className="space-y-3 border-t border-border pt-6 mb-6">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">{product.estimatedDelivery}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Store className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Click & Collect</p>
                <p className="text-sm text-muted-foreground">
                  {product.clickCollectAvailable
                    ? 'Available — collect from any Verde Boutique'
                    : 'Not available for this item'}
                </p>
              </div>
            </div>
          </div>

          {/* Sustainability */}
          <div className="bg-secondary rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-primary" />
              <h3 className="font-heading font-semibold text-foreground">Sustainability</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2"><strong>Material:</strong> {product.material}</p>
            <p className="text-sm text-muted-foreground">{product.sustainabilityInfo}</p>
          </div>

          {/* Check in-store */}
          <p className="text-xs text-muted-foreground mt-4">
            Check in-store availability at our{' '}
            <Link to="/store-locator" className="text-primary hover:underline">boutique locations</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
