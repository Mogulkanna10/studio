import { AppLayout } from '@/components/app-layout';
import { SidebarProvider } from '@/components/ui/sidebar';
import { NotificationProvider } from '@/context/notification-context';

export default function MainLayout({
  children,
}) {
  return (
    <SidebarProvider>
      <NotificationProvider>
        <AppLayout>{children}</AppLayout>
      </NotificationProvider>
    </SidebarProvider>
  );
}
