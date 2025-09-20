
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gauge, CheckCircle, Percent } from 'lucide-react';
import { classifierPerformanceData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function ClassifierPerformance() {
  const { overallAccuracy, classMetrics, confusionMatrix, classNames } = classifierPerformanceData;

  const getCellColor = (value, row, col) => {
    if (row === col) {
      const accuracy = value / confusionMatrix[row].reduce((a, b) => a + b, 0);
      if (accuracy > 0.95) return 'bg-green-100 dark:bg-green-900/50';
      if (accuracy > 0.9) return 'bg-green-50 dark:bg-green-900/20';
      return 'bg-emerald-50 dark:bg-emerald-900/20';
    }
    if (value > 5) return 'bg-red-100 dark:bg-red-900/50';
    if (value > 0) return 'bg-amber-50 dark:bg-amber-900/20';
    return 'bg-card';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          Classifier Performance
        </CardTitle>
        <CardDescription>
          Performance metrics for the AI defect classification model.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-around rounded-lg bg-muted/50 p-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="text-4xl font-bold text-primary">
              {(overallAccuracy * 100).toFixed(1)}%
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Overall Accuracy
            </div>
          </div>
        </div>

        <div>
            <h4 className="font-semibold mb-2 text-md">Confusion Matrix</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Shows how the model's predictions (columns) compare against the actual classes (rows).
            </p>
            <div className="overflow-x-auto rounded-lg border">
            <Table className='text-xs sm:text-sm'>
                <TableHeader>
                <TableRow>
                    <TableHead className='sticky left-0 bg-card'>Actual \ Predicted</TableHead>
                    {classNames.map((name) => (
                    <TableHead key={name} className="text-center">{name}</TableHead>
                    ))}
                </TableRow>
                </TableHeader>
                <TableBody>
                {confusionMatrix.map((row, i) => (
                    <TableRow key={classNames[i]}>
                    <TableCell className="font-semibold sticky left-0 bg-card">{classNames[i]}</TableCell>
                    {row.map((cell, j) => (
                        <TableCell key={j} className={cn("text-center", getCellColor(cell, i, j))}>
                            {cell}
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </div>

         <div>
          <h4 className="font-semibold mb-2 text-md">Per-Class Accuracy</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {classMetrics.map((metric) => (
              <div key={metric.className} className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">{metric.className}</p>
                <p className="text-2xl font-semibold text-primary">
                  {(metric.accuracy * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
