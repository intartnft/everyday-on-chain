import { ethers } from "ethers";
import { MAINNET_PROVIDER_URL } from "./config";
import { encode } from "node-base64-image";
const abi = [
    "function tokenURI(uint256) public view returns (string)"
]


const collections = [
    { address: "0x18adc812fe66b9381700c2217f0c9dc816c879e6", shouldWrap: true, width: 630, height: 630 },
    { address: "0x4e1f41613c9084fdb9e34e11fae9412427480e56", shouldWrap: true, width: 388, height: 560 },
    { address: "0xca24e7d9e8a2ba3ada22383f5e2ad397b5677e25", shouldWrap: true, width: 20000, height: 20000 },
]

export type Collection = {
    address: string,
    width: number,
    height: number,
    shouldWrap: boolean
}

export type SelectedCollectionToken = {
    metadata: any,
    collection: Collection,
    tokenId: number
}

export async function parseImageDataURI(uri: string): Promise<string> {
    if (uri.includes("base64")) {
        return uri
    }

    if (uri.includes("svg") && uri.includes("utf8")) {
        const imageData = uri.split("utf8,")[1]
        const base64 = Buffer.from(imageData).toString('base64')
        return "data:image/svg+xml;base64," + base64
    }

    if (uri.includes("http")) {
        const imageData = await encode(uri)
        return "data:image/svg+xml;base64," + imageData
    }
    
    return uri
}

export function parseDataURI(uri: string): string {
    if (uri.includes("base64,")) {
        const data = uri.split("base64,")[1]
        const decoded = Buffer.from(data, 'base64').toString();
        return decoded
    } else if (uri.includes("json,")) {
        return uri.split("json,")[1]
    }
    return uri
}

export async function getRandomCollection(): Promise<SelectedCollectionToken> {
    const abi = [
        "function totalSupply() public view returns (uint256)",
        "function tokenURI(uint256) public view returns (string)"
    ]

    const collection = collections[Math.floor(Math.random() * collections.length)]

    const provider = new ethers.JsonRpcProvider(MAINNET_PROVIDER_URL, 1);
    const nftContract = new ethers.Contract(collection.address, abi, provider)
    const totalSupplyBig = await nftContract.totalSupply()
    const totalSupply = parseInt(totalSupplyBig)

    const randomToken = Math.floor(Math.random() * (totalSupply - 1)) + 1
    const tokenURI = await nftContract.tokenURI(randomToken)

    let jsonString = parseDataURI(tokenURI)

    jsonString = jsonString.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
    jsonString = jsonString.replace(/[\u0000-\u001F]+/g, "");

    const json = JSON.parse(jsonString)
    console.log(json["image"])

    return {
        metadata: json,
        collection: collection,
        tokenId: randomToken
    }
}