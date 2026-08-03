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
}

export interface ListingOutput {
  productTitle: string;
  bulletPoints: string[];
  description: string;
  backendKeywords: string[];
  etsyTags?: string[]; // Exactly 13 long-tail tags for Etsy
  seoScore: number;
  metaTitle: string;
  metaDescription: string;
  imageSuggestions: string[];
  altText: string[];
  faqs: { question: string; answer: string }[];
  seoResearchSummary?: string;
  competitorGaps?: string[];
}

export function buildSystemPrompt(marketplace: string): string {
  return `You are an elite E-Commerce Marketplace Copywriter and SEO Intelligence Specialist specializing in ${marketplace.toUpperCase()}.
Your task is to take raw product details, an optional current listing URL, and product image context to generate a high-converting, policy-compliant, and deeply SEO-optimized product listing.

Requirements per Marketplace:
- ETSY: 
  * MUST generate exactly 13 long-tail search tags in the "etsyTags" field. Each tag MUST be under 20 characters, multi-word long-tail phrases, matching real Etsy shopper search behavior.
  * Creative, keyword-rich title (max 140 chars) focusing on shopper intent, materials, and gift occasions.
  * Engaging, story-driven description with primary keywords in the first 2 sentences.
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
  "seoResearchSummary": "string (brief summary of high-volume search intent & keyword strategy)",
  "competitorGaps": ["string (opportunities found to outrank competing listings)"]
}`;
}

export function buildUserPrompt(input: ListingInput): string {
  return `Generate a complete, high-converting ${input.marketplace.toUpperCase()} product listing:

Brand: ${input.brand}
Product Name: ${input.productName}
Category: ${input.category || 'General'}
Target Country: ${input.targetCountry}
Key Features & Benefits:
${input.features.map(f => `- ${f}`).join('\n')}

Target Keywords: ${input.keywords.join(', ')}
${input.competitors && input.competitors.length > 0 ? `Competitors to Outrank: ${input.competitors.join(', ')}` : ''}
${input.currentListingUrl ? `Current Listing URL to Rewrite & Audit: ${input.currentListingUrl}` : ''}
${input.imageUrl ? `Product Image Context URL: ${input.imageUrl}` : ''}

${input.marketplace.toLowerCase() === 'etsy' ? 'CRITICAL ETSY RULE: Populate the "etsyTags" array with EXACTLY 13 unique, multi-word search tags under 20 characters each.' : ''}

Generate the JSON response following the strict schema provided.`;
}
