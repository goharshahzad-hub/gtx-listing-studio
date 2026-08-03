import { ListingInput, ListingOutput, buildSystemPrompt, buildUserPrompt } from './prompts';

export async function generateMarketplaceListing(
  input: ListingInput,
  apiKey?: string
): Promise<ListingOutput> {
  const openAiApiKey = apiKey || process.env.OPENAI_API_KEY;

  if (!openAiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not configured.');
  }

  const systemPrompt = buildSystemPrompt(input.marketplace);
  const userPrompt = buildUserPrompt(input);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('Failed to retrieve content from AI completion response.');
  }

  try {
    const parsed: ListingOutput = JSON.parse(content);
    return parsed;
  } catch (err) {
    throw new Error('Failed to parse AI output into JSON schema.');
  }
}
