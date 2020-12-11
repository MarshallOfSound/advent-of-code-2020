const input = global.loadInput().lines();

const sorted = [0];
for (const adapter of input) {
  const jolt = adapter.int();
  sorted.push(jolt);
}

sorted.sort((a, b) => a - b);
sorted.push(sorted[sorted.length - 1] + 3);

let oneDiff = 0;
let threeDiff = 0;
for (let i = 1; i < sorted.length; i++) {
  const d = sorted[i] - sorted[i - 1];
  if (d === 1) {
    oneDiff++;
  } else if (d === 3) {
    threeDiff++;
  }
}
console.log(oneDiff, threeDiff, oneDiff * threeDiff);
