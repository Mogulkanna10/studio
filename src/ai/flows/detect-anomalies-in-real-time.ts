'use server';
/**
 * @fileOverview An anomaly detection AI agent that detects deviations from baseline track conditions in real-time sensor data.
 *
 * - detectAnomalies - A function that handles the anomaly detection process.
 * - DetectAnomaliesInput - The input type for the detectAnomalies function.
 * - DetectAnomaliesOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomaliesInputSchema = z.object({
  sensorData: z.string().describe('Real-time sensor data from various sensors.'),
  baselineData: z.string().describe('Baseline track conditions data for comparison.'),
  threshold: z.number().describe('Threshold for anomaly detection.'),
});
export type DetectAnomaliesInput = z.infer<typeof DetectAnomaliesInputSchema>;

const DetectAnomaliesOutputSchema = z.object({
  isAnomaly: z.boolean().describe('Whether an anomaly is detected.'),
  location: z.string().describe('The location of the defect (e.g., chainage).'),
  defectType: z.string().describe('The specific type of defect identified (e.g., Crack, Buckling).'),
  anomalyDescription: z.string().describe('A summary description of the detected anomaly.'),
});
export type DetectAnomaliesOutput = z.infer<typeof DetectAnomaliesOutputSchema>;

export async function detectAnomalies(input: DetectAnomaliesInput): Promise<DetectAnomaliesOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomaliesPrompt',
  input: {schema: DetectAnomaliesInputSchema},
  output: {schema: DetectAnomaliesOutputSchema},
  prompt: `You are an expert in railway track anomaly detection.
  You will analyze real-time sensor data against baseline data to identify deviations that may require immediate attention.
  Based on the provided sensor data, baseline data, and threshold, determine if an anomaly exists.

  Sensor Data: {{{sensorData}}}
  Baseline Data: {{{baselineData}}}
  Threshold: {{{threshold}}}

  If an anomaly is detected, respond with isAnomaly: true and provide the specific location, defect type, and a descriptive summary.
  If no anomaly is detected, respond with isAnomaly: false and leave the other fields empty.
  `,
});

const detectAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: DetectAnomaliesInputSchema,
    outputSchema: DetectAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
