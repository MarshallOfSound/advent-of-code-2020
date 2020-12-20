declare namespace NodeJS {
  interface Global {
    loadInput(): string;
  }
}

declare interface String {
  lines(): string[];
  blocks(): string[][];
  int(): number;
  reverse(): string;
}

declare interface Array {
  toInts(): number[];
}

declare interface Math {
  expMod(x: number, y: number, z: number): number;
  expMod(x: BigInteger, y: BigInteger, z: BigInteger): BigInteger;
}
