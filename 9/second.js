const input = global.loadInput().lines();

let v = 0;
for (let i = 25; i < input.length; i++) {
  const sums = new Set();
  for (const row of input.slice(i - 25, i)) {
    for (const row2 of input.slice(i - 25, i)) {
      sums.add(row.int() + row2.int());
    }
  }
  const row = input[i];
  if (!sums.has(row.int())) {
    v = row.int();
    break;
  }
}

for (let i = 0; i < input.length; i++) {
  let j = i;
  let sum = 0;
  while (j < input.length && sum < v) {
    sum += input[j].int();
    j++;
  }
  if (sum === v) {
    const arr = input.slice(i, j).toInts().sort();
    console.log(arr[0] + arr[arr.length - 1]);
    break;
  }
}
