export const collections: Collection[] = [
  {
    address: '0x18adc812fe66b9381700c2217f0c9dc816c879e6', //Chaos Road
    shouldWrap: true,
    width: 630,
    height: 630,
    totalSupply: 400,
    route: "chaos-road"
  },
  {
    address: '0x4e1f41613c9084fdb9e34e11fae9412427480e56', //Terraforms
    shouldWrap: true,
    width: 388,
    height: 560,
    name: 'Terraforms',
    totalSupply: 9911,
    route: "terraforms"
  },
  {
    address: '0xca24e7d9e8a2ba3ada22383f5e2ad397b5677e25', //the metro
    shouldWrap: true,
    width: 20000,
    height: 20000,
    totalSupply: 2048,
    route: "the-metro"
  },
  {
    address: '0xccbe56ea12b845a281431290f202196864f2f576', //GOLD
    shouldWrap: false,
    width: 900,
    height: 1200,
    totalSupply: 500,
    route: "gold"
  },
  {
    address: '0xA1A657de1F522F15a7336942145Fa3C5432Dd44E', //Panopticon
    shouldWrap: false,
    width: 1000,
    height: 1333,
    totalSupply: 600,
    route: "panopticon"
  },
];

export type Collection = {
  address: string;
  width: number;
  height: number;
  shouldWrap: boolean;
  name?: string;
  totalSupply: number;
  route: string;
};
