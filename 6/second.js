const input = global.loadInput().lines();

let current = new Map();
let t = 0;
let c = 0;
for (const row of input) {
  if (row.trim().length === 0) {
    for (const key of current.keys()) {
      if (current.get(key) === c) t++;
    }
    current = new Map();
    c = 0;
  } else {
    for (const char of row) {
      if (!current.has(char)) current.set(char, 0);
      current.set(char, current.get(char) + 1);
    }
    c++;
  }
}
console.log(t);
