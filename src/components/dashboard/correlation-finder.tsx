"use client";

import { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  identifyCorrelations,
} from "@/ai/flows/identify-correlations-between-sensor-data";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "../ui/separator";

export default function CorrelationFinder() {
  const [request, setRequest] = useState(
    "Correlate high vibration readings from the IMU with LiDAR data showing ballast degradation in Sector 4."
  );
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const output = await identifyCorrelations({
        sensorDataSummary:
          "IMU shows vibration spikes up to 1.2g. LiDAR indicates ballast shoulder erosion. Axle encoder shows consistent speed.",
        analysisRequest: request,
      });
      setResult(output);
    } catch (error) {
      console.error("Correlation analysis failed", error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete the correlation analysis.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          AI Correlation Assistant
        </CardTitle>
        <CardDescription>
          Automatically identify correlations between disparate sensor data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="analysis-request">Analysis Request</Label>
            <Textarea
              id="analysis-request"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="e.g., Correlate vibration spikes with track geometry anomalies..."
              rows={3}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Find Correlations
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
             <Separator />
            <Alert>
              <Wand2 className="h-4 w-4" />
              <AlertTitle>Analysis Complete</AlertTitle>
              <AlertDescription className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold">Identified Correlations:</h4>
                  <p>{result.identifiedCorrelations}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Potential Track Issues:</h4>
                  <p>{result.potentialTrackIssues}</p>
                </div>
                 <div>
                  <h4 className="font-semibold">Suggested Actions:</h4>
                  <p>{result.suggestedActions}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
