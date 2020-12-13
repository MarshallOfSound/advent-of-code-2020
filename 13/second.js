const input = global.loadInput().lines();

const bus = [...input[1].split(',')].map((x) => (x === 'x' ? -1 : BigInt(x.int())));
const off = bus
  .map((_, i) => (bus[i] <= 0n ? null : [bus[i] - BigInt(i), bus[i]]))
  .filter((v) => v !== null);

let prod = 1n;
for (const [, n] of off) {
  prod *= n;
}
let total = 0n;
for (const [val, n] of off) {
  const b = prod / n;
  total += val * b * Math.expMod(b, n - 2n, n);
  total = total % prod;
  if (total < 0) total += prod;
}
console.log(total);
