import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { sensors } from '@/lib/data';
import { Signal, Waves, Radio, Camera } from 'lucide-react';
import React from 'react';

const iconMap = {
  Signal: Signal,
  Waves: Waves,
  Radio: Radio,
  Camera: Camera,
};

export default function SensorConfig() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sensors.map((sensor) => {
        const Icon = iconMap[sensor.iconName] || Signal;
        return (
          <Card key={sensor.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-6 w-6 text-muted-foreground" />
                <CardTitle>{sensor.name}</CardTitle>
              </div>
              <CardDescription>
                Configuration settings for the {sensor.type} sensor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label>Enable Sensor</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle data collection for this sensor.
                  </p>
                </div>
                <Switch defaultChecked={sensor.status !== 'Offline'} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`sample-rate-${sensor.id}`}>Sample Rate (Hz)</Label>
                <Input id={`sample-rate-${sensor.id}`} defaultValue="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`data-resolution-${sensor.id}`}>Data Resolution</Label>
                <Input id={`data-resolution-${sensor.id}`} defaultValue="16-bit" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
