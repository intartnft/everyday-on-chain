import { FrameImageMetadata, getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { getRandomCollectionFrameMetadata } from './randomCollection';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const frameMetadata = await getRandomCollectionFrameMetadata()
  const frameMetadataResponse = getFrameMetadata(frameMetadata)

  return {
    title: 'everyday on-chain',
    description: 'directly from the chain',
    openGraph: {
      title: 'everyday on-chain',
      description: 'directly from the chain',
      images: [
        {
          url: (frameMetadata.image as FrameImageMetadata).src,
        },
      ],
    },
    other: {
      ...frameMetadataResponse,
    },
  };
}

export default function Page() {
  return (
    <>
      <ul>
        <h1>a simple farcaster/warpcast frame for on-chain lovers</h1>
        <Link href="https://int.art">by int.art</Link>
      </ul>
    </>
  );
}
