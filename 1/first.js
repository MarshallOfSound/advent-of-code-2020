const input = global
  .loadInput()
  .lines()
  .map((i) => parseInt(i, 10));

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    if (i === j) continue;

    const sum = input[i] + input[j];
    if (sum === 2020) console.log(input[i] * input[jk]);
  }
}
