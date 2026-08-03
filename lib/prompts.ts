export interface ListingInput {
  productName: string;
  brand: string;
  category?: string;
  features: string[];
  targetCountry: string;
  keywords: string[];
  competitors?: string[];
  marketplace: 'amazon' | 'walmart' | 'etsy' | 'shopify' | 'ebay' | 'noon';
}

export interface ListingOutput {
  productTitle: string;
  bulletPoints: string[];
  description: string;
  backendKeywords: string[];
  seoScore: number;
  metaTitle: string;
  metaDescription: string;
  imageSuggestions: string[];
  altText: string[];
  faqs: { question: string; answer: string }[];
}

export function buildSystemPrompt(marketplace: string): string {
  return `You are an expert E-Commerce Marketplace Copywriter and SEO Specialist specializing in ${marketplace.toUpperCase()}.
Your task is to take raw product details and generate a high-converting, policy-compliant, and SEO-optimized product listing.

Requirements for ${marketplace.toUpperCase()}:
- Amazon: Title under 200 chars, 5 bullet points focused on benefits, HTML-free description, search terms in backend keywords.
- Walmart: Clear product title (Brand + Product + Key Attribute), 3-5 concise bullet points, detailed rich description, key features highlighted.
- Etsy: Creative title with long-tail keywords, story-driven description, tag suggestions, tag-oriented backend keywords.
- Shopify: Catchy title, clean HTML-formatted description, engaging bullets, optimized meta title and meta description.
- eBay: Direct item title (80 char limit target for mobile), item specifics friendly, structured bullet points.
- Noon: Clear title, benefit-oriented bullet points, standard Arabic/English friendly description guidelines.

OUTPUT REQUIREMENT:
You MUST return ONLY a valid JSON object matching this exact schema:
{
  "productTitle": "string",
  "bulletPoints": ["string"],
  "description": "string",
  "backendKeywords": ["string"],
  "seoScore": number (0-100 rating based on keyword coverage and clarity),
  "metaTitle": "string",
  "metaDescription": "string",
  "imageSuggestions": ["string"],
  "altText": ["string"],
  "faqs": [
    { "question": "string", "answer": "string" }
  ]
}`;
}

export function buildUserPrompt(input: ListingInput): string {
  return `Generate a complete ${input.marketplace.toUpperCase()} product listing for the following product:

Brand: ${input.brand}
Product Name: ${input.productName}
Category: ${input.category || 'General'}
Target Country: ${input.targetCountry}
Key Features & Benefits:
${input.features.map(f => `- ${f}`).join('\n')}

Target Keywords: ${input.keywords.join(', ')}
${input.competitors && input.competitors.length > 0 ? `Competitors to Outrank: ${input.competitors.join(', ')}` : ''}

Generate the JSON response following the strict schema provided.`;
}
