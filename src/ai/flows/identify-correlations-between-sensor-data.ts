'use server';

/**
 * @fileOverview This file defines a Genkit flow to identify correlations between disparate sensor data.
 *
 * - identifyCorrelations - A function that triggers the correlation identification flow.
 * - IdentifyCorrelationsInput - The input type for the identifyCorrelations function.
 * - IdentifyCorrelationsOutput - The return type for the identifyCorrelations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyCorrelationsInputSchema = z.object({
  sensorDataSummary: z
    .string()
    .describe(
      'A summary of the available sensor data, including sensor types and data ranges.'
    ),
  analysisRequest: z
    .string()
    .describe(
      'Specific instructions or requests for correlation analysis, including types of correlations to look for or specific sensors to focus on.'
    ),
});
export type IdentifyCorrelationsInput = z.infer<
  typeof IdentifyCorrelationsInputSchema
>;

const IdentifyCorrelationsOutputSchema = z.object({
  identifiedCorrelations: z
    .string()
    .describe(
      'A detailed description of the correlations found between different sensor data sets, including the strength and statistical significance of the correlations.'
    ),
  potentialTrackIssues: z
    .string()
    .describe(
      'An analysis of how the identified correlations may relate to potential issues or anomalies on the track, including specific locations or sections of concern.'
    ),
  suggestedActions: z
    .string()
    .describe(
      'Recommended actions for further investigation or maintenance based on the identified correlations and potential track issues.'
    ),
});
export type IdentifyCorrelationsOutput = z.infer<
  typeof IdentifyCorrelationsOutputSchema
>;

export async function identifyCorrelations(
  input: IdentifyCorrelationsInput
): Promise<IdentifyCorrelationsOutput> {
  return identifyCorrelationsFlow(input);
}

const identifyCorrelationsPrompt = ai.definePrompt({
  name: 'identifyCorrelationsPrompt',
  input: {schema: IdentifyCorrelationsInputSchema},
  output: {schema: IdentifyCorrelationsOutputSchema},
  prompt: `You are an expert data analyst specializing in railway track monitoring data.

  You will analyze sensor data summaries and specific analysis requests to identify correlations between different sensor data sets and their potential impact on track conditions.

  Based on your analysis, provide a detailed description of identified correlations, their statistical significance, and potential implications for track issues.

  Also, suggest actions for further investigation or maintenance based on the analysis.

  Sensor Data Summary: {{{sensorDataSummary}}}
  Analysis Request: {{{analysisRequest}}}

  Correlations Identified:
  Potential Track Issues:
  Suggested Actions: `,
});

const identifyCorrelationsFlow = ai.defineFlow(
  {
    name: 'identifyCorrelationsFlow',
    inputSchema: IdentifyCorrelationsInputSchema,
    outputSchema: IdentifyCorrelationsOutputSchema,
  },
  async input => {
    const {output} = await identifyCorrelationsPrompt(input);
    return output!;
  }
);
