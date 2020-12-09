const input = global.loadInput().lines();

for (let i = 25; i < input.length; i++) {
  const sums = new Set();
  for (const row of input.slice(i - 25, i)) {
    for (const row2 of input.slice(i - 25, i)) {
      sums.add(row.int() + row2.int());
    }
  }
  const row = input[i];
  if (!sums.has(row.int())) {
    console.log(row);
    return;
  }
}
