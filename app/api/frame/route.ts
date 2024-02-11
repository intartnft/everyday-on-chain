import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { getRandomCollectionFrameMetadata } from '../../randomCollection';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameMetadata: any = await getRandomCollectionFrameMetadata()
  frameMetadata.ogTitle = 'everyday on-chain'
  frameMetadata.ogDescription = 'directly from the chain'

  return new NextResponse(
    getFrameHtmlResponse(frameMetadata),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
