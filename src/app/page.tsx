'use client';

import { useRouter } from 'next/navigation';
import { ShieldCheck, Video, Train } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="https://picsum.photos/seed/railway-control/1920/1080"
        alt="Railway control room"
        fill
        className="object-cover"
        data-ai-hint="railway control room"
      />
      <div className="absolute inset-0 bg-blue-900/80" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8 text-center text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/90 p-2 rounded-md">
            <Train className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider">ITMS</h1>
            <p className="text-sm text-blue-200">Track Monitoring System</p>
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold !leading-tight tracking-tight mt-4">
          Indigenous Railway
          <br />
          Track Monitoring
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-blue-100/90">
          Advanced contactless integrated track monitoring system using LiDAR,
          Camera, IMU, and Axle Encoder for real-time anomaly detection and safety.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-6 text-lg"
            onClick={() => router.push('/dashboard')}
          >
            Access Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/50 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-6 text-lg"
          >
            <Video className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        <div className="mt-12 flex items-center justify-center gap-x-6 gap-y-2 flex-wrap">
          <div className="flex items-center gap-2 text-blue-200">
            <ShieldCheck className="h-4 w-4" />
            <span>Secure</span>
          </div>
           <span className="text-blue-400/50">·</span>
          <div className="flex items-center gap-2 text-blue-200">
            <ShieldCheck className="h-4 w-4" />
            <span>Reliable</span>
          </div>
           <span className="text-blue-400/50">·</span>
          <div className="flex items-center gap-2 text-blue-200">
            <ShieldCheck className="h-4 w-4" />
            <span>Real-time</span>
          </div>
           <span className="text-blue-400/50">·</span>
          <div className="flex items-center gap-2 text-blue-200">
            <ShieldCheck className="h-4 w-4" />
            <span>Indigenous Technology</span>
          </div>
        </div>
      </div>
       <footer className="absolute bottom-4 w-full text-center text-sm text-white/50 z-10">
        © {new Date().getFullYear()} RailWatch. All rights reserved.
      </footer>
    </div>
  );
}
