'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Train, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would add your authentication logic
    console.log('Logging in with:', { email, password });
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
       <div className="relative flex-col items-center justify-center p-8 text-white hidden md:flex bg-zinc-900">
        <Image
          src="https://picsum.photos/seed/railway-night/1920/1080"
          alt="Railway at night"
          fill
          className="object-cover opacity-30"
          data-ai-hint="railway night"
        />
        <div className="relative z-10 text-center space-y-4">
            <div className="flex items-center gap-3 justify-center mb-6">
                <div className="bg-primary/90 p-2 rounded-md">
                    <Train className="h-8 w-8 text-primary-foreground" />
                </div>
                 <h1 className="text-3xl font-bold tracking-wider">RailWatch ITMS</h1>
            </div>
          
          <h2 className="text-4xl font-bold">
            Intelligent Track Monitoring
          </h2>
          <p className="mt-2 max-w-md text-lg text-neutral-300">
            Harnessing real-time data for safer, more reliable railways.
          </p>
        </div>
        <footer className="absolute bottom-4 w-full text-center text-sm text-white/50 z-10">
            © 2024 RailWatch. All rights reserved.
        </footer>
      </div>

      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <a href="#" className="underline">
                        Sign up
                    </a>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
