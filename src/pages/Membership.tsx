import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Crown, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const benefits = [
  'Monthly curated sustainable fashion box delivered to your door',
  '10% discount on all orders — online and in-store',
  'Double loyalty points on every purchase',
  'Early access to new collections before public release',
  'Free returns on all membership orders',
  'Exclusive invitations to Verde Boutique events',
];

export default function Membership() {
  const handleSubscribe = () => {
    toast.success('Subscription request received! This is a simulated sign-up for demonstration purposes.');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-4xl font-bold text-foreground mb-3">EcoWardrobe Membership</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your gateway to sustainable style. Join our membership programme for exclusive benefits and curated fashion.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="bg-card border-2 border-primary rounded-xl p-8">
          <div className="text-center mb-6">
            <p className="text-sm text-primary uppercase tracking-wider font-medium mb-1">Monthly Membership</p>
            <p className="font-heading text-4xl font-bold text-foreground">£19.99<span className="text-lg text-muted-foreground font-normal">/month</span></p>
          </div>

          <ul className="space-y-3 mb-8">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <Button onClick={handleSubscribe} className="w-full gap-2" size="lg">
            Subscribe Now <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Cancel anytime. No commitment required. Simulated for demonstration.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Subscribe', desc: 'Sign up for the EcoWardrobe membership online or in-store.' },
            { step: '2', title: 'Receive', desc: 'Get a curated box of sustainable fashion pieces monthly.' },
            { step: '3', title: 'Enjoy', desc: 'Shop with discounts, earn double points, and access exclusives.' },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                {s.step}
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
