import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { ethers } from 'ethers';
import { getRandomCollection } from '../../randomCollection';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const randomCollection = await getRandomCollection()
  console.log(randomCollection);
  
  const name = randomCollection["name"]
  const description = randomCollection["description"]
  const image = randomCollection["image"]

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Show me random",
        },
      ],
      image: {
        src: image,
      },
      ogTitle: name,
      ogDescription: description,
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
