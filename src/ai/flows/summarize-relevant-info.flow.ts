'use server';

/**
 * @fileOverview A flow for summarizing relevant information about Indonesian topics based on a user query.
 *
 * - summarizeRelevantInfo - A function that summarizes information based on a query.
 * - SummarizeRelevantInfoInput - The input type for the summarizeRelevantInfo function.
 * - SummarizeRelevantInfoOutput - The return type for the summarizeRelevantInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRelevantInfoInputSchema = z.object({
  query: z.string().describe('The user query about Indonesian topics.'),
  news: z.string().optional().describe('Relevant news articles related to the query.'),
  economicData: z.string().optional().describe('Relevant economic data related to the query.'),
  demographics: z.string().optional().describe('Relevant demographic data related to the query.'),
  culturalFacts: z.string().optional().describe('Relevant cultural facts related to the query.'),
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
  prompt: `You are an AI chatbot providing information about Indonesia. A user has the following query: {{{query}}}.\n\nSummarize the most relevant and up-to-date information from the following sources to answer the query. Be concise and informative.\n\n{% if news %}News Articles: {{{news}}}\n{% endif %}{% if economicData %}Economic Data: {{{economicData}}}\n{% endif %}{% if demographics %}Demographics: {{{demographics}}}\n{% endif %}{% if culturalFacts %}Cultural Facts: {{{culturalFacts}}}\n{% endif %}`,
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
