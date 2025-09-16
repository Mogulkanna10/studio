'use client';

import { useRouter } from 'next/navigation';
import { Train } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="animated-grid-background relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8 flex items-center gap-2 text-2xl font-bold text-white z-10">
        <Train className="h-8 w-8" />
        <span>RailWatch</span>
      </div>
      <Card className="z-10 w-full max-w-sm border-neutral-700 bg-black/40 text-white backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ITMS Login</CardTitle>
          <CardDescription className="text-neutral-300">
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="inspector@railwatch.com"
                required
                className="bg-neutral-800/60 border-neutral-700 text-white placeholder:text-neutral-400 focus:bg-neutral-700/70"
                defaultValue="admin@railwatch.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-neutral-800/60 border-neutral-700 text-white placeholder:text-neutral-400 focus:bg-neutral-700/70"
                defaultValue="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-center text-sm text-white/50 z-10">
        © {new Date().getFullYear()} RailWatch. All rights reserved.
      </footer>
    </div>
  );
}
