'use client';
import { useState } from 'react';
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
import { Slider } from '@/components/ui/slider';

export default function SystemThresholds() {
    const [vibration, setVibration] = useState(1.2);
    const [twist, setTwist] = useState(5);
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection Thresholds</CardTitle>
        <CardDescription>
          Adjust the parameters for triggering system alerts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <Label htmlFor="vibration-threshold">Vibration Threshold (g)</Label>
            <span className="text-sm font-medium text-muted-foreground">{vibration.toFixed(1)} g</span>
          </div>
          <Slider
            id="vibration-threshold"
            min={0}
            max={5}
            step={0.1}
            value={[vibration]}
            onValueChange={(vals) => setVibration(vals[0])}
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <Label htmlFor="twist-threshold">Track Twist Threshold (mm/m)</Label>
            <span className="text-sm font-medium text-muted-foreground">{twist.toFixed(1)} mm/m</span>
          </div>
          <Slider
            id="twist-threshold"
            min={0}
            max={20}
            step={0.5}
            value={[twist]}
            onValueChange={(vals) => setTwist(vals[0])}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="temp-threshold">Temperature Threshold (°C)</Label>
          <Input id="temp-threshold" defaultValue="75" />
          <p className="text-sm text-muted-foreground">
            Maximum rail temperature before an alert is triggered.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Thresholds</Button>
      </CardFooter>
    </Card>
  );
}
