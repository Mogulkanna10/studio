'use client';

import Image from 'next/image';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const router = useRouter();
  const loginBg = PlaceHolderImages.find(img => img.id === 'login-background');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {loginBg && (
        <Image
          src={loginBg.imageUrl}
          alt={loginBg.description}
          data-ai-hint={loginBg.imageHint}
          fill
          className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[.25]"
        />
      )}
      <div className="absolute top-8 left-8 flex items-center gap-2 text-2xl font-bold text-white">
        <Train className="h-8 w-8" />
        <span>RailWatch</span>
      </div>
      <Card className="w-full max-w-sm border-0 bg-black/30 text-white backdrop-blur-sm">
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
                className="bg-neutral-700/50 border-neutral-600 text-white placeholder:text-neutral-400"
                defaultValue="admin@railwatch.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-neutral-700/50 border-neutral-600 text-white"
                defaultValue="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-center text-sm text-white/50">
        © {new Date().getFullYear()} RailWatch. All rights reserved.
      </footer>
    </div>
  );
}
