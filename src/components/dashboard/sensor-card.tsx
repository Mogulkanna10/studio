"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { Signal, Waves, Radio, Camera } from "lucide-react";
import React from "react";

const iconMap = {
  Signal: Signal,
  Waves: Waves,
  Radio: Radio,
  Camera: Camera,
};


export default function SensorCard({ sensor }) {
    const Icon = iconMap[sensor.iconName] || Signal;
  const statusColor =
    sensor.status === "Online"
      ? "text-green-500"
      : sensor.status === "Warning"
      ? "text-yellow-500"
      : "text-red-500";
    
  return (
    <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-muted-foreground" />
              <CardTitle>{sensor.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("h-2.5 w-2.5 rounded-full", statusColor.replace('text-', 'bg-'))} />
              <span className={cn("text-sm font-medium", statusColor)}>{sensor.status}</span>
            </div>
          </div>
          <CardDescription>{sensor.type} Data Feed</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{value: {label: sensor.name, color: "hsl(var(--primary))"}}} className="h-40 w-full">
            <AreaChart
              accessibilityLayer
              data={sensor.data}
              margin={{
                left: -20,
                right: 10,
                top: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="value"
                type="natural"
                fill="hsl(var(--primary) / 0.2)"
                stroke="hsl(var(--primary))"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
    </Card>
  );
}
