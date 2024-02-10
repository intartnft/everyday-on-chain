import { ethers } from "ethers";

const abi = [
    "function tokenURI(uint256) public view returns (string)"
]

export function parseDataURI(uri: string): string {
    const parsed = new URL(uri);
    const match = /^[^/]+\/[^,;]+(?:[^,]*?)(;base64)?,([\s\S]*)$/.exec(parsed.pathname);
   
    if (match == null) { 
        throw new Error()
    }
    
    const buffer = Buffer.from(decodeURIComponent(match[2]), match[1] ? 'base64' : 'utf8');
    return buffer.toString()
}

export async function getRandomCollection(): Promise<any> {
    const abi = [
        "function totalSupply() public view returns (uint256)",
        "function tokenURI(uint256) public view returns (string)"
    ]
    const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/FFBXRqK9QexBWyV2Z1pFFn-gj_XWKzye", 1);
    const nftContract = new ethers.Contract("0xca24e7d9e8a2ba3ada22383f5e2ad397b5677e25", abi, provider)
    const totalSupplyBig = await nftContract.totalSupply()
    const totalSupply = parseInt(totalSupplyBig)

    const randomToken = Math.floor(Math.random() * (totalSupply - 1)) + 1
    const tokenURI = await nftContract.tokenURI(randomToken)

    const jsonString = parseDataURI(tokenURI)
    const json = JSON.parse(jsonString)
    
    return json
}