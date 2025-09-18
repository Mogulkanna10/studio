"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function TrackHealthCard() {
    const healthScore = 98; // Example health score

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Track Health Score
        </CardTitle>
        <CardDescription>
            Overall infrastructure integrity rating.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center py-12">
        <div className="relative h-40 w-40">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                className="text-muted/50"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                />
                <path
                className="text-primary"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={`${healthScore}, 100`}
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">{healthScore}%</span>
            </div>
        </div>
        <p className="font-semibold text-2xl">Excellent</p>
        <p className="text-base text-muted-foreground">
            No critical issues detected.
        </p>
      </CardContent>
    </Card>
  );
}
