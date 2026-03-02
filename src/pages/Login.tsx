import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/account');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Welcome back!');
      navigate('/account');
    } else {
      toast.error('Invalid credentials. Please try the test account.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <Leaf className="h-10 w-10 text-primary mx-auto mb-4" />
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-sm">Sign in to your Verde Boutique account</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" className="w-full" size="lg">Sign In</Button>
      </form>

      <div className="mt-6 bg-secondary rounded-lg p-4">
        <p className="text-sm font-medium text-foreground mb-2">Test Account Credentials:</p>
        <p className="text-sm text-muted-foreground">
          <strong>Email:</strong> testcustomer@ecothreads.com
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Password:</strong> Eco1234
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          This test account has pre-loaded order history, loyalty points, and membership data.
        </p>
      </div>
    </div>
  );
}
