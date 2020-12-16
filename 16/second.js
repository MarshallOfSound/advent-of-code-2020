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

const goodTickets = [];

const pFields = Object.keys(fields);
for (const t of nearTickets) {
  let deadTicket = false;
  for (const v of t) {
    let g = false;
    for (const field of pFields) {
      const [r1, r2] = fields[field];
      if (inRange(v, r1) || inRange(v, r2)) {
        g = true;
        break;
      }
    }
    if (!g) {
      deadTicket = true;
    }
  }
  if (!deadTicket) goodTickets.push(t);
}

const possibles = [];
for (const _ of goodTickets[0]) {
  possibles.push([...pFields]);
}

for (const t of goodTickets) {
  for (let i = 0; i < t.length; i++) {
    const v = t[i];
    for (const field of possibles[i]) {
      const [r1, r2] = fields[field];
      if (!inRange(v, r1) && !inRange(v, r2)) {
        possibles[i] = possibles[i].filter((f) => f !== field);
      }
    }
  }
}

while (possibles.find((p) => p.length !== 1)) {
  for (let i = 0; i < possibles.length; i++) {
    if (possibles[i].length === 1) {
      for (let j = 0; j < possibles.length; j++) {
        if (i === j) continue;
        possibles[j] = possibles[j].filter((p) => p !== possibles[i][0]);
      }
    }
  }
}

const m = possibles.reduce(
  (accum, f, i) => (f[0].startsWith('departure') ? myTicket[i] * accum : accum),
  1,
);

console.log(m);
