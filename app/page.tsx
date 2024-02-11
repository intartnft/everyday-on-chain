import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { getRandomCollection } from './randomCollection';
import { parseImageDataURI, wrapImageSourceAndEncode } from './imageUtilities';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const randomCollection = await getRandomCollection()
  const name = randomCollection.metadata["name"]
  const image = randomCollection.metadata["image"]

  let fixedImage = await parseImageDataURI(image)
  if (randomCollection.collection.shouldWrap) {
    fixedImage = wrapImageSourceAndEncode(
      fixedImage,
      randomCollection.collection.width,
      randomCollection.collection.height
    )
  }

  let fixedName = name
  if (randomCollection.collection.name) {
    fixedName = randomCollection.collection.name + " " + name
  }

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: fixedName,
        action: "link",
        target: "https://opensea.io/assets/ethereum/" + randomCollection.collection.address + "/" + randomCollection.tokenId
      },
      {
        label: "Show me more",
      },
    ],
    image: {
      src: fixedImage,
      aspectRatio: '1:1'
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
  });

  return {
    title: 'everyday on-chain',
    description: 'directly from the chain',
    openGraph: {
      title: 'everyday on-chain',
      description: 'directly from the chain',
      images: [{
        url: fixedImage
      }],
    },
    other: {
      ...frameMetadata,
    }
  }
}

export default function Page() {
  return (
    <>
      <ul>
        <h1>a simple farcaster/warpcast frame for on-chain addictions</h1>
        <Link href="https://int.art">by int.art</Link>
      </ul>
    </>
  );
}
