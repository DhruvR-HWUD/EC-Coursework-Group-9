import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, discount, total, couponCode, couponApplied, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      toast.success('Coupon WELCOME10 applied — 10% discount!');
      setCouponInput('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Discover our sustainable collection and find something you love.</p>
        <Link to="/shop"><Button className="gap-2">Shop Now <ArrowRight className="h-4 w-4" /></Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-4 bg-card rounded-lg p-4 border border-border">
              <div
                className="w-24 h-24 rounded-md flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: item.product.color }}
              >
                <span className="text-xs text-foreground/50 text-center font-heading">{item.product.name}</span>
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="font-heading font-semibold text-foreground hover:text-primary text-sm">
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                <p className="text-sm font-medium text-foreground mt-1">£{item.product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-1 rounded border border-border hover:bg-secondary">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-1 rounded border border-border hover:bg-secondary">
                    <Plus className="h-3 w-3" />
                  </button>
                  <button onClick={() => removeItem(item.product.id, item.size)} className="p-1 rounded text-destructive hover:bg-destructive/10 ml-2">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">£{(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Order Summary</h2>

          {/* Coupon */}
          <div className="mb-4">
            {couponApplied ? (
              <div className="flex items-center justify-between bg-primary/10 rounded-md px-3 py-2">
                <span className="text-sm text-primary font-medium flex items-center gap-1">
                  <Tag className="h-3 w-3" /> {couponCode} applied
                </span>
                <button onClick={removeCoupon} className="text-xs text-destructive hover:underline">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  className="text-sm"
                />
                <Button variant="outline" size="sm" onClick={handleApplyCoupon}>Apply</Button>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Discount (10%)</span>
                <span>-£{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-foreground font-semibold text-lg border-t border-border pt-2 mt-2">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout">
            <Button className="w-full mt-6 gap-2" size="lg">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            Loyalty points will be earned at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
