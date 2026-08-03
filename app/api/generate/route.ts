import { NextResponse } from 'next/server';
import { generateMarketplaceListing } from '@/lib/generator';
import { ListingInput } from '@/lib/prompts';

export async function POST(request: Request) {
  try {
    const body: Partial<ListingInput> = await request.json();

    if (!body.productName || body.productName.trim() === '') {
      return NextResponse.json(
        { error: 'Product Name or Title is required.' },
        { status: 400 }
      );
    }

    const sanitizedInput: ListingInput = {
      productName: body.productName.trim(),
      brand: body.brand && body.brand.trim() !== '' ? body.brand.trim() : 'Premium Brand',
      marketplace: body.marketplace || 'etsy',
      category: body.category || 'General',
      targetCountry: body.targetCountry || 'US',
      features: body.features && body.features.length > 0 ? body.features : ['High quality materials', 'Durable design', 'Everyday utility'],
      keywords: body.keywords || [],
      competitors: body.competitors || [],
      currentListingUrl: body.currentListingUrl,
      imageUrl: body.imageUrl,
    };

    const listing = await generateMarketplaceListing(sanitizedInput);

    return NextResponse.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during listing generation.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
