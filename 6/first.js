const input = global.loadInput().lines();

let current = new Set();
let t = 0;
for (const row of input) {
  if (row.trim().length === 0) {
    t += current.size;
    current = new Set();
  } else {
    for (const char of row) {
      current.add(char);
    }
  }
}
console.log(t);
