'use server';

/**
 * @fileOverview A flow for summarizing relevant information based on a user query.
 *
 * - summarizeRelevantInfo - A function that summarizes information based on a query.
 * - SummarizeRelevantInfoInput - The input type for the summarizeRelevantInfo function.
 * - SummarizeRelevantInfoOutput - The return type for the summarizeRelevantInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRelevantInfoInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type SummarizeRelevantInfoInput = z.infer<typeof SummarizeRelevantInfoInputSchema>;

const SummarizeRelevantInfoOutputSchema = z.object({
  summary: z.string().describe('A summary of the most relevant and up-to-date information based on the query.'),
});
export type SummarizeRelevantInfoOutput = z.infer<typeof SummarizeRelevantInfoOutputSchema>;

export async function summarizeRelevantInfo(input: SummarizeRelevantInfoInput): Promise<SummarizeRelevantInfoOutput> {
  return summarizeRelevantInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRelevantInfoPrompt',
  input: {schema: SummarizeRelevantInfoInputSchema},
  output: {schema: SummarizeRelevantInfoOutputSchema},
  prompt: `You are a helpful AI chatbot. A user has the following query: {{{query}}}.\n\nProvide a conversational and helpful response.`,
});

const summarizeRelevantInfoFlow = ai.defineFlow(
  {
    name: 'summarizeRelevantInfoFlow',
    inputSchema: SummarizeRelevantInfoInputSchema,
    outputSchema: SummarizeRelevantInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
