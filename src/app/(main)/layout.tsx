import { AppLayout } from '@/components/app-layout';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function MainLayout({
  children,
}) {
  return (
    <SidebarProvider>
      <AppLayout>{children}</AppLayout>
    </SidebarProvider>
  );
}
