import { FrameImageMetadata, getFrameMessage, getFrameHtmlResponse, FrameMetadata } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { ethers } from 'ethers';
import { getRandomCollection, parseImageDataURI } from '../../randomCollection';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const randomCollection = await getRandomCollection()
  
  const name = randomCollection.metadata["name"]
  const description = randomCollection.metadata["description"]

  const image = randomCollection.metadata["image"]
  const imageData = randomCollection.metadata["image_data"]
  
  let targetImage;
  if (image) {
    targetImage = image
  }else if (imageData) {
    targetImage = imageData
  }
  const fixedImage = parseImageDataURI(targetImage)
  
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: name,
          action: "link",
          target: "https://opensea.io/assets/ethereum/" + randomCollection.address + "/" + randomCollection.tokenId
        },
        {
          label: "Show me more",
        },
      ],
      image: {
        src: fixedImage,
        aspectRatio: '1:1'
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