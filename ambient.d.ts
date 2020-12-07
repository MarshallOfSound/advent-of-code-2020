declare namespace NodeJS {
  interface Global {
    loadInput(): string;
  }
}

declare interface String {
  lines(): string[];
  blocks(): string[][];
  int(): number;
}

declare interface Array {
  toInts(): number[];
}
