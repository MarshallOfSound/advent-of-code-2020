const input = global.loadInput().lines();

const fields = {};
let myTicket = null;
const nearTickets = [];

for (const row of input) {
  if (!row) continue;
  if (row === 'your ticket:' || row === 'nearby tickets:') continue;

  const fieldReg = /^(.+?): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)$/;
  const fieldMatch = fieldReg.exec(row);
  if (fieldMatch) {
    const [, fieldName, a, b, c, d] = fieldMatch;
    fields[fieldName] = [
      [a.int(), b.int()],
      [c.int(), d.int()],
    ];
  } else if (!myTicket) {
    myTicket = row.split(',').toInts();
  } else {
    nearTickets.push(row.split(',').toInts());
  }
}

const inRange = (n, [a, b]) => {
  if (n < a) return false;
  if (n > b) return false;
  return true;
};

let bad = 0;

const pFields = Object.keys(fields);
for (const t of nearTickets) {
  // console.log(t, bad);
  for (const v of t) {
    let g = false;
    for (const field of pFields) {
      const [r1, r2] = fields[field];
      if (inRange(v, r1) || inRange(v, r2)) {
        g = true;
        break;
      }
    }
    if (!g) bad += v;
  }
}

console.log(bad);
