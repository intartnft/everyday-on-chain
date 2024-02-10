import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { getRandomCollection, parseImageDataURI } from './randomCollection';

export async function generateMetadata(): Promise<Metadata> {
  const randomCollection = await getRandomCollection()
  const name = randomCollection.metadata["name"]
  const image = randomCollection.metadata["image"]
  const fixedImage = parseImageDataURI(image)

  const frameMetadata = getFrameMetadata({
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
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
  });

  return {
    title: 'everyday on-chain',
    description: 'LFG',
    openGraph: {
      title: 'everyday on-chain',
      description: 'LFG',
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
      <h1>zizzamia.xyz</h1>
    </>
  );
}
