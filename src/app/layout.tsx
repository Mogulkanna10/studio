import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'RailWatch ITMS Dashboard',
  description: 'Intelligent Track Monitoring System for modern railways.',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
