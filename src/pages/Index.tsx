import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, MapPin, Crown, Recycle, Truck, Store } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import heroImage from '@/assets/hero.jpg';

const features = [
  { icon: Recycle, title: 'Sustainable Materials', desc: 'Every piece is crafted from eco-friendly, certified materials.' },
  { icon: Truck, title: 'Seamless Delivery', desc: 'Home delivery or Click & Collect from any of our 3 boutiques.' },
  { icon: Crown, title: 'EcoWardrobe Membership', desc: 'Monthly fashion boxes, double loyalty points, and exclusive access.' },
  { icon: Store, title: 'Unified Experience', desc: 'Your account, points, and history — connected across all channels.' },
];

export default function Index() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={heroImage}
          alt="Sustainable fashion collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/20" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg animate-fade-in">
            <p className="text-primary-foreground/80 text-sm uppercase tracking-[0.2em] mb-3 font-body">
              Sustainable Style. Seamlessly Connected.
            </p>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Fashion That<br />
              <span className="italic">Cares</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 font-body">
              Ethically sourced, sustainably made. Shop online or visit our boutiques for a seamless omni-channel experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="gap-2">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/membership">
                <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                  Join EcoWardrobe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 verde-sand-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Leaf className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Commitment to the Planet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At Verde Boutique, sustainability isn't a trend — it's our foundation. Every garment is made from certified organic, recycled, or upcycled materials. We partner with Fair Trade artisans and use zero-waste production methods wherever possible.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            From our carbon-neutral shipping to our circular fashion initiatives, we're building a future where style and sustainability coexist beautifully.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground">New Arrivals</h2>
            <Link to="/shop" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Visit Our Boutiques</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Experience our collections in person at one of our three locations. Enjoy Click & Collect, in-store returns, and the same loyalty benefits.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {['London — Covent Garden', 'Manchester — Northern Quarter', 'Brighton — The Lanes'].map(store => (
              <div key={store} className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{store}</span>
              </div>
            ))}
          </div>
          <Link to="/store-locator">
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" /> Find a Store
            </Button>
          </Link>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 verde-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Crown className="h-10 w-10 mx-auto mb-6 opacity-80" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join EcoWardrobe Membership
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-lg mx-auto">
            Get a monthly sustainable fashion box, 10% off all orders, double loyalty points, and early access to new collections.
          </p>
          <Link to="/membership">
            <Button size="lg" variant="secondary" className="gap-2">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
