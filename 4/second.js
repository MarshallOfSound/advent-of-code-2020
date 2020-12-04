const input = global.loadInput().lines();

const req = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const allowed = [...req, 'cid'];

let current = {};
let t = 0;
for (const row of input) {
  if (row.trim().length === 0) {
    if (
      Object.keys(current).every((k) => allowed.includes(k)) &&
      req.every((k) => Object.keys(current).includes(k)) &&
      current.byr.int() >= 1920 &&
      current.byr.int() <= 2002 &&
      current.iyr.int() >= 2010 &&
      current.iyr.int() <= 2020 &&
      current.eyr.int() >= 2020 &&
      current.eyr.int() <= 2030 &&
      /^#[0-9a-f]{6}$/i.test(current.hcl) &&
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(current.ecl) &&
      /^[0-9]{9}$/.test(current.pid)
    ) {
      const h = current.hgt;
      if (h.endsWith('cm')) {
        const n = h.slice(0, h.length - 2).int();
        if (n >= 150 && n <= 193) {
          t++;
        }
      } else if (h.endsWith('in')) {
        const n = h.slice(0, h.length - 2).int();
        if (n >= 59 && n <= 76) {
          t++;
        }
      }
    }
    current = {};
  } else {
    for (const pair of row.trim().split(' ')) {
      current[pair.split(':')[0]] = pair.split(':')[1];
    }
  }
}
console.log(t);
