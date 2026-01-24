import { NextRequest, NextResponse } from 'next/server';
import { getCombinedData } from '@/components/NftCollectiondata';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    console.log(`[API] Fetching NFT rankings: offset=${offset}, limit=${limit}`);
    const data = await getCombinedData(offset, limit);
    console.log(`[API] Returned ${data.length} items. First collection: ${data[0]?.collection?.name}`);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching NFT rankings:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
