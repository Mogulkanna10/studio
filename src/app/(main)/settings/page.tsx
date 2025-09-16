import type { Metadata } from 'next';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import UserManagement from '@/components/settings/user-management';
import SensorConfig from '@/components/settings/sensor-config';
import SystemThresholds from '@/components/settings/system-thresholds';

export const metadata: Metadata = {
  title: 'Settings | RailWatch ITMS',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage system configurations, users, and thresholds.
        </p>
      </div>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="sensors">Sensor Configuration</TabsTrigger>
          <TabsTrigger value="thresholds">System Thresholds</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="sensors">
          <SensorConfig />
        </TabsContent>
        <TabsContent value="thresholds">
          <SystemThresholds />
        </TabsContent>
      </Tabs>
    </div>
  );
}
