import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Order } from '@/contexts/AuthContext';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = (location.state as { order?: Order })?.order;

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl text-foreground mb-4">No order found</h1>
        <Link to="/shop"><Button>Continue Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">Thank you for your purchase. Your order is being processed.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-heading text-lg font-bold text-foreground">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="text-sm text-foreground">{order.date}</p>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-foreground mb-3">Items</h3>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} (Size: {item.size}) × {item.quantity}</span>
                <span className="text-foreground">£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span><span>£{order.subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-primary">
              <span>Discount</span><span>-£{order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-foreground text-lg border-t border-border pt-2">
            <span>Total Paid</span><span>£{order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Method</span>
            <span className="text-foreground">
              {order.deliveryMethod === 'home' ? 'Home Delivery' : `Click & Collect — ${order.store}`}
            </span>
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <p className="text-sm text-primary font-semibold">
            🎉 You earned {order.loyaltyPointsEarned} loyalty points!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Points are added to your account and can be redeemed on future purchases.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
        <Link to="/shop">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <ShoppingBag className="h-4 w-4" /> Continue Shopping
          </Button>
        </Link>
        <Link to="/account">
          <Button className="gap-2 w-full sm:w-auto">
            View My Account <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
