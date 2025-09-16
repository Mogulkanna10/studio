'use client';

import { useState } from 'react';
import { FilePlus, Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { generateInsightfulReportSummaries } from '@/ai/flows/generate-insightful-report-summaries';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function ReportGenerator() {
  const [reportData, setReportData] = useState(
    'Sector 7 inspection complete. LiDAR scan shows minor ballast displacement at CH 25+150. IMU recorded a vibration anomaly of 0.9g at the same location. All other sensor readings are within normal parameters. Recommend visual inspection of the site.'
  );
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    if (!reportData.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some report data to summarize.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary('');

    try {
      const result = await generateInsightfulReportSummaries({ reportData });
      setSummary(result.summary);
      toast({
        title: 'Summary Generated',
        description: 'AI-powered summary has been successfully created.',
      });
    } catch (error) {
      console.error('Failed to generate summary', error);
      toast({
        title: 'Error',
        description: 'Could not generate the report summary.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus /> On-Demand Report
        </CardTitle>
        <CardDescription>
          Generate a new report with an AI-powered summary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="report-data">Inspection Report Data</Label>
          <Textarea
            id="report-data"
            placeholder="Paste or write your inspection findings here..."
            rows={6}
            value={reportData}
            onChange={(e) => setReportData(e.target.value)}
          />
        </div>
        {summary && (
          <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertTitle>AI Summary</AlertTitle>
            <AlertDescription>{summary}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleGenerateSummary}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Generate Summary
        </Button>
      </CardFooter>
    </Card>
  );
}
