const input = global
  .loadInput()
  .lines()
  .map((i) => parseInt(i, 10));

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < i; j++) {
    for (let k = 0; k < j; k++) {
      const sum = input[i] + input[j] + input[k];
      if (sum === 2020) console.log(input[i] * input[j] * input[k]);
    }
  }
}
