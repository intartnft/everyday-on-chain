import { ethers } from 'ethers';
import { MAINNET_PROVIDER_URL, NEXT_PUBLIC_URL } from './config';
import { Collection, collections } from './collections';
import { parseDataURI, parseImageDataURI, wrapImageSourceAndEncode } from './imageUtilities';
import { getFrameMetadata } from '@coinbase/onchainkit';
import { FrameMetadataResponse, FrameMetadataType } from '@coinbase/onchainkit/lib/core/types';

const abi = [
    'function totalSupply() public view returns (uint256)',
    'function tokenURI(uint256) public view returns (string)',
];

const provider = new ethers.JsonRpcProvider(MAINNET_PROVIDER_URL, 1);

export type SelectedCollectionToken = {
    metadata: any;
    collection: Collection;
    tokenId: number;
};

export async function getRandomCollection(): Promise<SelectedCollectionToken> {
    const collection = collections[Math.floor(Math.random() * collections.length)];
    const nftContract = new ethers.Contract(collection.address, abi, provider);

    const randomToken = Math.floor(Math.random() * (collection.totalSupply - 1)) + 1;
    const tokenURI = await nftContract.tokenURI(randomToken);

    let jsonString = parseDataURI(tokenURI);

    jsonString = jsonString
        .replace(/\\n/g, '\\n')
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, '\\&')
        .replace(/\\r/g, '\\r')
        .replace(/\\t/g, '\\t')
        .replace(/\\b/g, '\\b')
        .replace(/\\f/g, '\\f');
    jsonString = jsonString.replace(/[\u0000-\u001F]+/g, '');

    const json = JSON.parse(jsonString);

    return {
        metadata: json,
        collection: collection,
        tokenId: randomToken,
    };
}

export async function getRandomCollectionFrameMetadata(): Promise<FrameMetadataType> {
    const randomCollection = await getRandomCollection();
    const name = randomCollection.metadata['name'];
    const image = randomCollection.metadata['image'];

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

    return {
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
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }
}