"use client";

import Image from 'next/image';
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
import type { Sensor } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Signal, Waves, Radio, Camera } from "lucide-react";
import React from "react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const iconMap = {
  Signal: Signal,
  Waves: Waves,
  Radio: Radio,
  Camera: Camera,
};


type SensorCardProps = {
  sensor: Omit<Sensor, "Icon">;
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
};

export default function SensorCard({ sensor }: SensorCardProps) {
    const Icon = iconMap[sensor.iconName] || Signal;
  const statusColor =
    sensor.status === "Online"
      ? "text-green-400"
      : sensor.status === "Warning"
      ? "text-yellow-400"
      : "text-red-400";
    
  const placeholderImage = PlaceHolderImages.find(img => img.id === sensor.type.toLowerCase());

  return (
    <Card className="relative overflow-hidden">
        {placeholderImage && (
            <>
                <Image
                    src={placeholderImage.imageUrl}
                    alt={placeholderImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={placeholderImage.imageHint}
                />
                <div className="absolute inset-0 bg-black/60" />
            </>
        )}
      <div className="relative">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-white/80" />
              <CardTitle className="text-white">{sensor.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("h-2.5 w-2.5 rounded-full", statusColor.replace('text-', 'bg-'))} />
              <span className={cn("text-sm font-medium", statusColor)}>{sensor.status}</span>
            </div>
          </div>
          <CardDescription className="text-white/70">{sensor.type} Data Feed</CardDescription>
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
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="hsl(var(--foreground) / 0.5)"
                className="text-white"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--foreground) / 0.5)"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" labelClassName="text-white" className="bg-background/80 backdrop-blur-sm" />}
              />
              <Area
                dataKey="value"
                type="natural"
                fill="hsl(var(--primary) / 0.3)"
                stroke="hsl(var(--primary))"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </div>
    </Card>
  );
}