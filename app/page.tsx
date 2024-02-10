import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { getRandomCollection, parseImageDataURI } from './randomCollection';

export async function generateMetadata(): Promise<Metadata> {
  const randomCollection = await getRandomCollection()
  const image = randomCollection["image"]
  const fixedImage = parseImageDataURI(image)

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Show me random",
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
        url: fixedImage,
        width: 500,
        height: 500
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
