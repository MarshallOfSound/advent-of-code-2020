const input = global.loadInput().lines();

const req = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const allowed = [...req, 'cid'];

let current = {};
let t = 0;
for (const row of input) {
  if (row.trim().length === 0) {
    if (
      Object.keys(current).every((k) => allowed.includes(k)) &&
      req.every((k) => Object.keys(current).includes(k))
    ) {
      t++;
    }
    current = {};
  } else {
    for (const pair of row.trim().split(' ')) {
      current[pair.split(':')[0]] = pair.split(':')[1];
    }
  }
}
console.log(t);
