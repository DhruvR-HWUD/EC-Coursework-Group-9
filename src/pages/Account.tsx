import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Crown, Package, Star, MapPin, RotateCcw, LogOut } from 'lucide-react';

const tabs = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'loyalty', label: 'Loyalty', icon: Star },
  { id: 'membership', label: 'Membership', icon: Crown },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
];

export default function Account() {
  const { user, isAuthenticated, logout, requestReturn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">My Account</h1>
        <p className="text-muted-foreground mb-6">Please log in to access your account.</p>
        <Link to="/login"><Button>Log In</Button></Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Welcome, {user.name}</h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" /> Log Out
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Star className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{user.loyaltyPoints}</p>
          <p className="text-xs text-muted-foreground">Loyalty Points</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Package className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{user.orders.length}</p>
          <p className="text-xs text-muted-foreground">Total Orders</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Crown className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground capitalize">{user.membershipStatus}</p>
          <p className="text-xs text-muted-foreground">{user.membershipType} Membership</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Order History</h2>
          {user.orders.length === 0 ? (
            <p className="text-muted-foreground">No orders yet.</p>
          ) : (
            user.orders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-lg p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <p className="font-heading font-semibold text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.status === 'Delivered' ? 'bg-primary/10 text-primary' :
                      order.status === 'Returned' ? 'bg-destructive/10 text-destructive' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold text-foreground">£{order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i}>{item.name} (Size: {item.size}) × {item.quantity}</p>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-primary">+{order.loyaltyPointsEarned} points earned</p>
                  {order.status === 'Delivered' && !order.returnRequested && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => requestReturn(order.id)}
                      className="gap-1 text-xs"
                    >
                      <RotateCcw className="h-3 w-3" /> Request Return
                    </Button>
                  )}
                  {order.returnRequested && (
                    <span className="text-xs text-destructive">Return requested</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'loyalty' && (
        <div className="space-y-6">
          <h2 className="font-heading text-xl font-semibold text-foreground">Loyalty Points</h2>
          <div className="bg-primary/10 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-primary">{user.loyaltyPoints}</p>
            <p className="text-sm text-muted-foreground mt-1">Available Points</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-heading font-semibold text-foreground mb-3">How It Works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Earn 1 point per £1 spent online or in-store</li>
              <li>• EcoWardrobe members earn double points</li>
              <li>• Points can be redeemed on future purchases</li>
              <li>• 100 points = £5 discount</li>
              <li>• Points are unified across all channels</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'membership' && (
        <div className="space-y-6">
          <h2 className="font-heading text-xl font-semibold text-foreground">Membership Status</h2>
          <div className="bg-card border border-primary rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-primary" />
              <div>
                <p className="font-heading text-lg font-bold text-foreground">{user.membershipType}</p>
                <p className="text-sm text-primary capitalize">{user.membershipStatus}</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Monthly sustainable fashion box</li>
              <li>✓ 10% discount on all orders</li>
              <li>✓ Double loyalty points</li>
              <li>✓ Early access to new collections</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Saved Addresses</h2>
          {user.addresses.map(addr => (
            <div key={addr.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">{addr.label}</p>
                {addr.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Default</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{addr.address}</p>
              <p className="text-sm text-muted-foreground">{addr.city}, {addr.postcode}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
