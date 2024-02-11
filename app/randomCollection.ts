import { ethers } from 'ethers';
import { MAINNET_PROVIDER_URL } from './config';
import { Collection, collections } from './collections';
import { parseDataURI } from './imageUtilities';

const abi = [
    'function totalSupply() public view returns (uint256)',
    'function tokenURI(uint256) public view returns (string)',
];

export type SelectedCollectionToken = {
    metadata: any;
    collection: Collection;
    tokenId: number;
};

export async function getRandomCollection(): Promise<SelectedCollectionToken> {
    const collection = collections[Math.floor(Math.random() * collections.length)];

    const provider = new ethers.JsonRpcProvider(MAINNET_PROVIDER_URL, 1);
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
