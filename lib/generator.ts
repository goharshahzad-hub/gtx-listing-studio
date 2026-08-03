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

  const userContent: any[] = [{ type: 'text', text: userPrompt }];

  const activeImage = input.imageFileBase64 || input.imageUrl;
  if (activeImage) {
    userContent.push({
      type: 'image_url',
      image_url: { url: activeImage },
    });
  }

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
        { role: 'user', content: userContent },
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

  return JSON.parse(content) as ListingOutput;
}
