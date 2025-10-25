'use server';

import { summarizeRelevantInfo } from '@/ai/flows/summarize-relevant-info.flow';

/**
 * Calls the GenAI flow to get a summarized response based on the user's query.
 * @param query - The user's question.
 * @returns A promise that resolves to the AI-generated summary string.
 */
export async function getAiResponse(query: string): Promise<string> {
  try {
    const result = await summarizeRelevantInfo({
      query,
    });
    return result.summary;
  } catch (error) {
    console.error('Error getting AI response:', error);
    // Provide a user-friendly error message
    return 'Maaf, saya kesulitan terhubung ke basis pengetahuan saya. Silakan coba lagi nanti.';
  }
}
