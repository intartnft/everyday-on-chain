export const collections: Collection[] = [
  {
    address: '0x18adc812fe66b9381700c2217f0c9dc816c879e6',
    shouldWrap: true,
    width: 630,
    height: 630,
    totalSupply: 400,
  },
  {
    address: '0x4e1f41613c9084fdb9e34e11fae9412427480e56',
    shouldWrap: true,
    width: 388,
    height: 560,
    name: "Terraforms",
    totalSupply: 9911
  },
  {
    address: '0xca24e7d9e8a2ba3ada22383f5e2ad397b5677e25',
    shouldWrap: true,
    width: 20000,
    height: 20000,
    totalSupply: 2048
  },
];

export type Collection = {
  address: string;
  width: number;
  height: number;
  shouldWrap: boolean;
  name?: string;
  totalSupply: number;
};
