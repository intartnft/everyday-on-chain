import { ethers } from "ethers";
import { MAINNET_PROVIDER_URL } from "./config";

const abi = [
    "function tokenURI(uint256) public view returns (string)"
]

const collections = [
    "0x18adc812fe66b9381700c2217f0c9dc816c879e6",
    "0x4e1f41613c9084fdb9e34e11fae9412427480e56",
    "0xccbe56ea12b845a281431290f202196864f2f576",
    "0xca24e7d9e8a2ba3ada22383f5e2ad397b5677e25",
]

export type Collection = {
    metadata: any,
    address: string,
    tokenId: number
}

export function parseImageDataURI(uri: string): string {
    if (uri.includes("base64")) {
        return uri
    }

    if (uri.includes("svg") && uri.includes("utf8")) {
        const imageData = uri.split("utf8,")[1]

        const base64 = Buffer.from(imageData).toString('base64')
        return "data:image/svg+xml;base64," + base64
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

export async function getRandomCollection(): Promise<Collection> {
    const abi = [
        "function totalSupply() public view returns (uint256)",
        "function tokenURI(uint256) public view returns (string)"
    ]

    const collectionAddress = collections[Math.floor(Math.random() * collections.length)]

    const provider = new ethers.JsonRpcProvider(MAINNET_PROVIDER_URL, 1);
    const nftContract = new ethers.Contract(collectionAddress, abi, provider)
    const totalSupplyBig = await nftContract.totalSupply()
    const totalSupply = parseInt(totalSupplyBig)

    const randomToken = Math.floor(Math.random() * (totalSupply - 1)) + 1
    const tokenURI = await nftContract.tokenURI(randomToken)
    console.log(tokenURI);

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

    return {
        metadata: json,
        address: collectionAddress,
        tokenId: randomToken
    }
}