import { stores } from '@/data/stores';
import { MapPin, Phone, Clock, Store } from 'lucide-react';

export default function StoreLocator() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-4xl font-bold text-foreground mb-3">Our Boutiques</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Visit us in person for a seamless shopping experience. All locations offer Click & Collect and in-store returns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stores.map(store => (
          <div key={store.id} className="bg-card border border-border rounded-xl p-6 verde-card-hover">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-lg font-bold text-foreground">{store.name}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>{store.address}</p>
                  <p>{store.city}, {store.postcode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{store.phone}</p>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  {store.hours.map((h, i) => (
                    <p key={i}><span className="text-foreground font-medium">{h.days}:</span> {h.time}</p>
                  ))}
                </div>
              </div>

              {store.clickCollectAvailable && (
                <div className="bg-primary/10 rounded-md px-3 py-2 text-center">
                  <p className="text-sm text-primary font-medium">✓ Click & Collect Available</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-secondary rounded-lg p-6 max-w-2xl mx-auto text-center">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Omni-Channel Experience</h3>
        <p className="text-sm text-muted-foreground">
          Your Verde Boutique account works seamlessly across all channels. Earn and redeem loyalty points in-store and online. 
          Use your coupons everywhere. Return online purchases at any boutique. Your order history is centralised across all touchpoints.
        </p>
      </div>
    </div>
  );
}
