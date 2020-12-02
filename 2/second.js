const input = global.loadInput().lines();

let t = 0;
for (const pw of input) {
  const [r, l, p] = pw.split(' ');
  const start = r.split('-')[0].int();
  const end = r.split('-')[1].int();
  const letter = l[0];
  const matches = p[start - 1] === letter;
  const matches2 = p[end - 1] === letter;
  if (matches ^ matches2) {
    t++;
  }
}
console.log(t);
