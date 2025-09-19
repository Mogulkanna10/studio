'use server';
/**
 * @fileOverview An AI agent that classifies rail defects from an image.
 *
 * - classifyRailDefect - A function that handles the rail defect classification process.
 * - ClassifyRailDefectInput - The input type for the classifyRailDefect function.
 * - ClassifyRailDefectOutput - The return type for the classifyRailDefect function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyRailDefectInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a potential rail defect, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyRailDefectInput = z.infer<typeof ClassifyRailDefectInputSchema>;

const ClassifyRailDefectOutputSchema = z.object({
  defectType: z.enum(["Crack", "Corrosion", "Buckling", "No Defect"]).describe("The type of defect identified in the image."),
  confidence: z.number().min(0).max(1).describe("The confidence score of the classification, from 0 to 1."),
  assessment: z.string().describe("A brief assessment of the identified defect."),
});
export type ClassifyRailDefectOutput = z.infer<typeof ClassifyRailDefectOutputSchema>;


export async function classifyRailDefect(input: ClassifyRailDefectInput): Promise<ClassifyRailDefectOutput> {
  return classifyRailDefectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyRailDefectPrompt',
  input: {schema: ClassifyRailDefectInputSchema},
  output: {schema: ClassifyRailDefectOutputSchema},
  prompt: `You are an expert in railway maintenance and remote visual inspection.
  Analyze the following image of a rail track and classify the most prominent defect.
  The possible defect types are: "Crack", "Corrosion", "Buckling", or "No Defect".

  Provide a confidence score for your classification and a brief assessment of the issue.
  If there is no defect, classify it as "No Defect" with a high confidence score.

  Image: {{media url=imageDataUri}}`,
});

const classifyRailDefectFlow = ai.defineFlow(
  {
    name: 'classifyRailDefectFlow',
    inputSchema: ClassifyRailDefectInputSchema,
    outputSchema: ClassifyRailDefectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
