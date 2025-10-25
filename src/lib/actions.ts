'use server';

import { summarizeRelevantInfo } from '@/ai/flows/summarize-relevant-info.flow';
import { CULTURAL_FACTS, DEMOGRAPHICS, ECONOMIC_DATA, NEWS_ARTICLES } from '@/lib/data';

/**
 * Calls the GenAI flow to get a summarized response based on the user's query
 * and pre-defined contextual data about Indonesia.
 * @param query - The user's question.
 * @returns A promise that resolves to the AI-generated summary string.
 */
export async function getAiResponse(query: string): Promise<string> {
  try {
    const result = await summarizeRelevantInfo({
      query,
      news: NEWS_ARTICLES,
      economicData: ECONOMIC_DATA,
      demographics: DEMOGRAPHICS,
      culturalFacts: CULTURAL_FACTS,
    });
    return result.summary;
  } catch (error) {
    console.error('Error getting AI response:', error);
    // Provide a user-friendly error message
    return 'Sorry, I am having trouble connecting to my knowledge base. Please try again in a moment.';
  }
}
