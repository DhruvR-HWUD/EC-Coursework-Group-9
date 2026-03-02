import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RotateCcw, Check } from 'lucide-react';
import { toast } from 'sonner';

const reasons = [
  'Item does not fit',
  'Item not as described',
  'Changed my mind',
  'Received wrong item',
  'Item damaged or defective',
];

export default function Returns() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    orderNumber: '',
    reason: '',
    method: '' as 'courier' | 'in-store' | '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.orderNumber || !form.reason || !form.method) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitted(true);
    toast.success('Return request submitted successfully');
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Return Confirmed</h1>
        <p className="text-muted-foreground mb-2">
          Your return request for order <strong>{form.orderNumber}</strong> has been submitted.
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Method:</strong> {form.method === 'courier' ? 'Courier collection' : 'Return in-store'}
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          You will receive a confirmation email with further instructions.
        </p>
        <Button onClick={() => { setSubmitted(false); setForm({ orderNumber: '', reason: '', method: '' }); }} variant="outline">
          Submit Another Return
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <div className="text-center mb-8">
        <RotateCcw className="h-10 w-10 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Returns & Exchanges</h1>
        <p className="text-muted-foreground text-sm">
          We offer a 30-day return window on all purchases. Returns can be processed online or at any Verde Boutique location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-5">
        <div>
          <Label htmlFor="orderNumber">Order Number</Label>
          <Input
            id="orderNumber"
            placeholder="e.g. VB-2024-001"
            value={form.orderNumber}
            onChange={e => setForm(prev => ({ ...prev, orderNumber: e.target.value }))}
          />
        </div>

        <div>
          <Label>Reason for Return</Label>
          <div className="space-y-2 mt-2">
            {reasons.map(reason => (
              <button
                key={reason}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, reason }))}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                  form.reason === reason
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Return Method</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {([
              { value: 'courier', label: '📦 Courier Collection', desc: 'We\'ll arrange a pickup' },
              { value: 'in-store', label: '🏪 Return In-Store', desc: 'Drop off at any boutique' },
            ] as const).map(method => (
              <button
                key={method.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, method: method.value }))}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  form.method === method.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <p className="text-sm font-medium text-foreground">{method.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{method.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Submit Return Request
        </Button>
      </form>

      <div className="mt-8 bg-secondary rounded-lg p-5">
        <h3 className="font-heading font-semibold text-foreground mb-2">Return Policy</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• 30-day return window from date of delivery</li>
          <li>• Items must be unworn with original tags attached</li>
          <li>• Free returns for EcoWardrobe members</li>
          <li>• Cross-channel returns accepted (buy online, return in-store)</li>
          <li>• Refunds processed within 5-7 business days</li>
        </ul>
      </div>
    </div>
  );
}
