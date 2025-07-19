import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    setIsLogging(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock authentication (replace with real authentication)
    if (email === 'admin@university.edu' && password === 'admin123') {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
      onLogin();
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid email or password.",
        variant: "destructive"
      });
    }

    setIsLogging(false);
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-trust mr-3" />
            <h1 className="text-3xl font-bold text-trust">SafeVoice</h1>
          </div>
          <p className="text-muted-foreground">
            Admin Portal Access
          </p>
        </div>

        <Card className="shadow-[var(--shadow-elevated)]">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-8 w-8 text-trust" />
            </div>
            <CardTitle className="text-trust">Secure Login</CardTitle>
            <CardDescription>
              Access the admin dashboard to manage reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@university.edu"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--gradient-primary)] hover:bg-trust-light"
                disabled={isLogging}
              >
                {isLogging ? 'Authenticating...' : 'Login to Dashboard'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Demo Credentials</h4>
              <p className="text-xs text-muted-foreground">
                Email: admin@university.edu<br />
                Password: admin123
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Forgot your password? Contact IT Support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}