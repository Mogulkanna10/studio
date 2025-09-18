"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// This function replicates the Python script's data generation logic in JavaScript.
const generateSyntheticData = (
  name,
  startValue,
  trend,
  noiseScale,
  maintenanceFreq
) => {
  const data = [];
  let currentValue = startValue;
  for (let day = 1; day <= 400; day++) {
    currentValue += trend;
    // A simple way to simulate np.random.normal
    const noise = (Math.random() - 0.5) * 2 * noiseScale;
    currentValue += noise;

    if (day % maintenanceFreq === 0) {
      currentValue = startValue + (Math.random() - 0.5) * 2 * (noiseScale * 0.5);
    }
    if (currentValue < 0) {
      currentValue = 0;
    }
    data.push({ day, [name]: parseFloat(currentValue.toFixed(2)) });
  }
  return data;
};

// This function generates the future prediction line.
const generatePrediction = (historicalData, trend, noiseScale) => {
  const lastDay = historicalData[historicalData.length - 1];
  let lastValue = lastDay ? lastDay.Unevenness_Score : 1.5;
  const predictions = [];

  for (let day = 1; day <= 490; day++) {
    if (day <= 400) {
      const historicalPoint = historicalData.find(d => d.day === day);
      if (historicalPoint) {
         predictions.push({ day, prediction: historicalPoint.Unevenness_Score });
      }
    } else {
        lastValue += trend;
        const noise = (Math.random() - 0.5) * 2 * noiseScale;
        lastValue += noise;
        if(lastValue < 0) lastValue = 0;
        predictions.push({ day, prediction: parseFloat(lastValue.toFixed(2)) });
    }
  }
  return predictions;
};


const historicalData = generateSyntheticData("Unevenness_Score", 1.5, 0.06, 0.3, 90);
const predictionData = generatePrediction(historicalData, 0.06, 0.3);

const combinedData = historicalData.map((hist, i) => ({
  ...hist,
  prediction: predictionData[i]?.prediction,
}));

const threshold = 6.0;
const predictedFailureDay = predictionData.find(p => p.prediction >= threshold);


export default function PredictiveChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Predictive Track Geometry Forecast
        </CardTitle>
        <CardDescription>
          Historical and 90-day predicted trend for Unevenness Score.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={combinedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Score (Higher is Worse)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Unevenness_Score"
              name="Historical Data"
              stroke="#375EAB"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="prediction"
              name="Predicted Trend"
              stroke="#EAB308"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <ReferenceLine
                y={threshold}
                label={{ value: `Maint. Threshold (${threshold})`, position: "insideTopRight" }}
                stroke="red"
                strokeWidth={2}
            />
            {predictedFailureDay && (
                <ReferenceDot
                    x={predictedFailureDay.day}
                    y={predictedFailureDay.prediction}
                    r={5}
                    fill="red"
                    stroke="white"
                />
            )}
             {predictedFailureDay && (
                <ReferenceLine
                    x={predictedFailureDay.day}
                    stroke="green"
                    strokeDasharray="3 3"
                    label={{ value: `Maint. by Day ${predictedFailureDay.day}`, position: 'insideBottomRight' }}
                />
             )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
