'use server';
/**
 * @fileOverview Generates insightful summaries of railway inspection reports using an AI model.
 *
 * - generateInsightfulReportSummaries - A function that generates summaries of reports.
 * - GenerateInsightfulReportSummariesInput - The input type for the generateInsightfulReportSummaries function.
 * - GenerateInsightfulReportSummariesOutput - The return type for the generateInsightfulReportSummaries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightfulReportSummariesInputSchema = z.object({
  reportData: z.string().describe('The content of the railway inspection report.'),
});
export type GenerateInsightfulReportSummariesInput = z.infer<typeof GenerateInsightfulReportSummariesInputSchema>;

const GenerateInsightfulReportSummariesOutputSchema = z.object({
  summary: z.string().describe('The summarized insights from the railway inspection report.'),
});
export type GenerateInsightfulReportSummariesOutput = z.infer<typeof GenerateInsightfulReportSummariesOutputSchema>;

export async function generateInsightfulReportSummaries(input: GenerateInsightfulReportSummariesInput): Promise<GenerateInsightfulReportSummariesOutput> {
  return generateInsightfulReportSummariesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightfulReportSummariesPrompt',
  input: {schema: GenerateInsightfulReportSummariesInputSchema},
  output: {schema: GenerateInsightfulReportSummariesOutputSchema},
  prompt: `You are an AI expert in summarizing railway inspection reports. Please provide a concise summary of the following report, highlighting key findings and potential issues:\n\nReport Data: {{{reportData}}}`,
});

const generateInsightfulReportSummariesFlow = ai.defineFlow(
  {
    name: 'generateInsightfulReportSummariesFlow',
    inputSchema: GenerateInsightfulReportSummariesInputSchema,
    outputSchema: GenerateInsightfulReportSummariesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
