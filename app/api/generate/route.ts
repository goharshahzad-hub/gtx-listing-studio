import { NextResponse } from 'next/server';
import { generateMarketplaceListing } from '@/lib/generator';
import { ListingInput } from '@/lib/prompts';

export async function POST(request: Request) {
  try {
    const body: ListingInput = await request.json();

    if (!body.productName || !body.brand || !body.marketplace) {
      return NextResponse.json(
        { error: 'Missing required fields: productName, brand, and marketplace are required.' },
        { status: 400 }
      );
    }

    const listing = await generateMarketplaceListing(body);

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
