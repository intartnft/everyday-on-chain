import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { getRandomCollection } from '../../randomCollection';
import { parseImageDataURI, wrapImageSourceAndEncode } from '../../imageUtilities';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const randomCollection = await getRandomCollection();

  const name = randomCollection.metadata['name'];
  const description = randomCollection.metadata['description'];

  const image = randomCollection.metadata['image'];
  const imageData = randomCollection.metadata['image_data'];

  let targetImage;
  if (image) {
    targetImage = image;
  } else if (imageData) {
    targetImage = imageData;
  }

  let fixedImage = await parseImageDataURI(image);
  if (randomCollection.collection.shouldWrap) {
    fixedImage = wrapImageSourceAndEncode(
      fixedImage,
      randomCollection.collection.width,
      randomCollection.collection.height,
    );
  }

  let fixedName = name;
  if (randomCollection.collection.name) {
    fixedName = randomCollection.collection.name + ' ' + name;
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: fixedName,
          action: 'link',
          target:
            'https://opensea.io/assets/ethereum/' +
            randomCollection.collection.address +
            '/' +
            randomCollection.tokenId,
        },
        {
          label: 'Show me more',
        },
      ],
      image: {
        src: fixedImage,
        aspectRatio: '1:1',
      },
      ogTitle: fixedName,
      ogDescription: description,
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
