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
import type { Sensor } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Signal, Waves, Radio } from "lucide-react";
import React from "react";

const iconMap = {
  Signal: Signal,
  Waves: Waves,
  Radio: Radio,
};


type SensorCardProps = {
  sensor: Omit<Sensor, "Icon">;
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--accent))",
  },
};

export default function SensorCard({ sensor }: SensorCardProps) {
    const Icon = iconMap[sensor.iconName] || Signal;
  const statusColor =
    sensor.status === "Online"
      ? "bg-green-500"
      : sensor.status === "Warning"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-lg">{sensor.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("h-2.5 w-2.5 rounded-full", statusColor)} />
            <span className="text-sm text-muted-foreground">{sensor.status}</span>
          </div>
        </div>
        <CardDescription>{sensor.type} Data Feed</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-40 w-full">
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
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-value)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
