import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { stores } from '@/data/stores';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, subtotal, discount, total, couponApplied, clearCart } = useCart();
  const { isAuthenticated, user, addOrder } = useAuth();
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'click-collect'>('home');
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.addresses[0]?.address || '',
    city: user?.addresses[0]?.city || '',
    postcode: user?.addresses[0]?.postcode || '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryMethod === 'home' && (!form.name || !form.email || !form.address || !form.city || !form.postcode)) {
      toast.error('Please fill in all shipping fields');
      return;
    }
    if (deliveryMethod === 'click-collect' && (!form.name || !form.email)) {
      toast.error('Please fill in your name and email');
      return;
    }

    const orderId = `VB-${Date.now().toString().slice(-6)}`;
    const loyaltyPoints = Math.round(total);
    const storeName = stores.find(s => s.id === selectedStore)?.name;

    const order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: items.map(i => ({
        name: i.product.name,
        size: i.size,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      discount,
      total,
      loyaltyPointsEarned: isAuthenticated ? (user?.membershipStatus === 'active' ? loyaltyPoints * 2 : loyaltyPoints) : loyaltyPoints,
      status: 'Processing' as const,
      deliveryMethod,
      store: deliveryMethod === 'click-collect' ? storeName : undefined,
    };

    if (isAuthenticated) {
      addOrder(order);
    }

    clearCart();
    navigate('/order-confirmation', { state: { order } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Contact & Shipping */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Emma Green" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="emma@example.com" />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Delivery Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {(['home', 'click-collect'] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setDeliveryMethod(method)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    deliveryMethod === method
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <p className="font-medium text-foreground text-sm">
                    {method === 'home' ? '🚚 Home Delivery' : '🏪 Click & Collect'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {method === 'home' ? '3-5 business days — Free' : 'Ready in 2 hours'}
                  </p>
                </button>
              ))}
            </div>

            {deliveryMethod === 'home' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={form.address} onChange={handleChange} placeholder="42 Willow Lane" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={form.city} onChange={handleChange} placeholder="London" />
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" name="postcode" value={form.postcode} onChange={handleChange} placeholder="SW1A 1AA" />
                </div>
              </div>
            )}

            {deliveryMethod === 'click-collect' && (
              <div>
                <Label>Select Store</Label>
                <div className="space-y-2 mt-2">
                  {stores.filter(s => s.clickCollectAvailable).map(store => (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => setSelectedStore(store.id)}
                      className={`w-full p-3 rounded-lg border text-left text-sm transition-colors ${
                        selectedStore === store.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <p className="font-medium text-foreground">{store.name}</p>
                      <p className="text-xs text-muted-foreground">{store.address}, {store.city} {store.postcode}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Payment</h2>
            <p className="text-xs text-muted-foreground mb-3">This is a simulated payment for demonstration purposes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['card', 'cash'] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    paymentMethod === method
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <p className="font-medium text-foreground text-sm">
                    {method === 'card' ? '💳 Test Card Mode' : '💵 Cash on Pickup'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {method === 'card' ? 'Simulated card payment' : 'Pay when collecting'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                <span className="text-foreground">£{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t border-border pt-3">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Discount (10%)</span><span>-£{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span><span>Free</span>
            </div>
            <div className="flex justify-between text-foreground font-semibold text-lg border-t border-border pt-2">
              <span>Total</span><span>£{total.toFixed(2)}</span>
            </div>
          </div>
          <Button type="submit" className="w-full mt-6" size="lg">
            Place Order
          </Button>
          {isAuthenticated && (
            <p className="text-xs text-primary text-center mt-2">
              You'll earn {Math.round(total) * (user?.membershipStatus === 'active' ? 2 : 1)} loyalty points
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
