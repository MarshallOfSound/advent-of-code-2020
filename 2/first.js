const input = global.loadInput().lines();

let t = 0;
for (const pw of input) {
  const [r, l, p] = pw.split(' ');
  const start = parseInt(r.split('-')[0], 10);
  const end = parseInt(r.split('-')[1], 10);
  const letter = l[0];
  const pass = p;
  const count = pass.split('').filter((l) => l === letter).length;
  if (start <= count && count <= end) {
    t++;
  }
}
console.log(t);
