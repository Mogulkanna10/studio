'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Train } from 'lucide-react';

import { cn } from '@/lib/utils';
import { navItems } from '@/lib/data';
import { Header } from '@/components/header';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" className="md:hidden" asChild>
                <SidebarTrigger />
             </Button>
            <div
              className={cn(
                'flex items-center gap-2 overflow-hidden transition-all duration-300',
                'group-data-[collapsible=icon]:-ml-2 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0'
              )}
            >
              <Train className="size-6 shrink-0" />
              <span className="text-lg font-semibold">RailWatch</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.Icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
