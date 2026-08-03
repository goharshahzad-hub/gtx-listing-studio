export interface ListingInput {
  productName: string;
  brand: string;
  category?: string;
  features: string[];
  targetCountry: string;
  keywords: string[];
  competitors?: string[];
  marketplace: 'amazon' | 'walmart' | 'etsy' | 'shopify' | 'ebay' | 'noon';
  currentListingUrl?: string;
  imageUrl?: string;
  imageFileBase64?: string;
}

export interface ListingOutput {
  productTitle: string;
  bulletPoints: string[];
  description: string;
  backendKeywords: string[];
  etsyTags?: string[];
  seoScore: number;
  metaTitle: string;
  metaDescription: string;
  imageSuggestions: string[];
  altText: string[];
  faqs: { question: string; answer: string }[];
  seoResearchSummary?: string;
  competitorGaps?: string[];
  visualInsights?: string;
}

export function buildSystemPrompt(marketplace: string): string {
  return `You are an elite E-Commerce Marketplace Copywriter and SEO Intelligence Specialist specializing in ${marketplace.toUpperCase()}.
Your task is to take product names, optional features, existing listing URLs, and visual product images (JPG/PNG uploads) to generate a high-converting, policy-compliant, and deeply SEO-optimized product listing.

Requirements per Marketplace:
- ETSY: 
  * MUST generate exactly 13 long-tail search tags in the "etsyTags" field. Each tag MUST be under 20 characters, multi-word phrases.
  * Creative, keyword-rich title (max 140 chars) focusing on shopper intent, materials, and gift occasions.
- AMAZON: Title under 200 chars, 5 benefit-driven bullet points, plain text description, backend search terms.
- WALMART: Brand + Product Name + Key Attribute title, 3-5 bullet points, rich description.
- SHOPIFY: SEO meta title, meta description, clean HTML-formatted description.
- EBAY: Mobile-optimized 80-char title, item specifics, bullet points.
- NOON: Clear title, benefit bullets, Middle East e-commerce friendly description.

OUTPUT REQUIREMENT:
You MUST return ONLY a valid JSON object matching this exact schema:
{
  "productTitle": "string",
  "bulletPoints": ["string"],
  "description": "string",
  "backendKeywords": ["string"],
  "etsyTags": ["string"], // Exactly 13 tags for Etsy (array of 13 strings, each < 20 chars)
  "seoScore": number (0-100),
  "metaTitle": "string",
  "metaDescription": "string",
  "imageSuggestions": ["string"],
  "altText": ["string"],
  "faqs": [
    { "question": "string", "answer": "string" }
  ],
  "seoResearchSummary": "string",
  "visualInsights": "string (details extracted from the uploaded image if provided)"
}`;
}

export function buildUserPrompt(input: ListingInput): string {
  return `Generate a complete ${input.marketplace.toUpperCase()} product listing:

Brand: ${input.brand}
Product Name: ${input.productName}
Category: ${input.category || 'General'}
Target Country: ${input.targetCountry}
${input.features && input.features.length > 0 ? `Key Features:\n${input.features.map(f => `- ${f}`).join('\n')}` : 'Key Features: Auto-infer from product title & image context.'}

Target Keywords: ${input.keywords.join(', ')}
${input.competitors && input.competitors.length > 0 ? `Competitors: ${input.competitors.join(', ')}` : ''}
${input.currentListingUrl ? `Current Listing URL to Rewrite: ${input.currentListingUrl}` : ''}

${input.marketplace.toLowerCase() === 'etsy' ? 'CRITICAL ETSY RULE: Populate "etsyTags" with EXACTLY 13 unique tags under 20 chars each.' : ''}

Generate the JSON response matching the required schema.`;
}
