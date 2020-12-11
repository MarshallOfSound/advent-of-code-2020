const input = global.loadInput().lines();

const sorted = [0];
for (const adapter of input) {
  const jolt = adapter.int();
  sorted.push(jolt);
}

sorted.sort((a, b) => a - b);
sorted.push(sorted[sorted.length - 1] + 3);

const v = {};
function find(i) {
  if (v[i]) return v[i];
  if (i === sorted.length - 1) return 1;
  const c = sorted[i];
  const test1 = sorted[i + 1];
  const test2 = sorted[i + 2];
  const test3 = sorted[i + 3];
  let t = 0;
  if (test1 - c <= 3) t += find(i + 1);
  if (test2 - c <= 3) t += find(i + 2);
  if (test3 - c <= 3) t += find(i + 3);
  v[i] = t;
  return t;
}

console.log(find(0));
