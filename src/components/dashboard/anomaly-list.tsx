'use client'
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Loader2, GitMerge, Waves, CircleDashed } from "lucide-react";
import { anomalies as initialAnomalies } from "@/lib/data";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { detectAnomalies } from "@/ai/flows/detect-anomalies-in-real-time";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/context/notification-context";

const anomalyIcons = {
    'Track Geometry': GitMerge,
    'Corrugation': Waves,
    'Ballast Defect': CircleDashed,
    'Default': AlertTriangle,
};


export default function AnomalyList() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { addNotification } = useNotifications();

    const handleCheckAnomalies = async () => {
        setIsLoading(true);
        try {
            const result = await detectAnomalies({
                sensorData: "Recent sensor readings showing a spike in vibration at CH 15+200. A potential crack is suspected.",
                baselineData: "Normal vibration levels are between 0.1g and 0.5g.",
                threshold: 0.8
            });

            if (result.isAnomaly) {
                const notificationTitle = `New Anomaly: ${result.defectType}`;
                const notificationDescription = `${result.anomalyDescription} at ${result.location}.`;
                
                addNotification({
                  title: notificationTitle,
                  description: notificationDescription,
                  severity: 'High'
                });
                toast({
                    title: "New Anomaly Detected!",
                    description: notificationDescription,
                    variant: "destructive",
                });
            } else {
                 toast({
                    title: "No New Anomalies",
                    description: "System check complete, all parameters are within normal limits.",
                });
            }

        } catch (error) {
            console.error("Failed to check for anomalies", error);
            toast({
                title: "Error",
                description: "Could not check for new anomalies.",
                variant: "destructive",
            });
        }
        setIsLoading(false);
    }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
            <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Real-Time Anomalies
            </CardTitle>
            <CardDescription>
                Deviations detected from baseline conditions.
            </CardDescription>
        </div>
        <Button onClick={handleCheckAnomalies} disabled={isLoading} size="sm">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Check
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initialAnomalies.map((anomaly) => {
            const Icon = anomalyIcons[anomaly.type] || anomalyIcons.Default;
            return (
                <div key={anomaly.id} className="flex items-start gap-4">
                    <div className={cn("p-2 rounded-full bg-muted", {
                        'bg-destructive/10': anomaly.severity === 'High',
                        'bg-secondary': anomaly.severity === 'Medium',
                        'bg-muted': anomaly.severity === 'Low',
                    })}>
                         <Icon className={cn("h-5 w-5 text-muted-foreground", {
                            'text-destructive': anomaly.severity === 'High',
                            'text-secondary-foreground': anomaly.severity === 'Medium',
                         })} />
                    </div>
                    <div className="flex-grow">
                        <div className='flex justify-between items-center'>
                            <p className="font-semibold">{anomaly.type} at {anomaly.chainage}</p>
                            <Badge
                            variant={
                                anomaly.severity === "High"
                                ? "destructive"
                                : anomaly.severity === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                            >
                            {anomaly.severity}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                        {anomaly.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{anomaly.timestamp}</p>
                    </div>
                </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
