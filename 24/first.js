const input = global.loadInput().lines();

const grid = new Map();

const moveCube = ([x, y, z], c) => {
  switch (c) {
    case 'e':
      return [x + 1, y - 1, z];
    case 'w':
      return [x - 1, y + 1, z];
    case 'ne':
      return [x + 1, y, z - 1];
    case 'nw':
      return [x, y + 1, z - 1];
    case 'se':
      return [x, y - 1, z + 1];
    case 'sw':
      return [x - 1, y, z + 1];
  }

  throw 'a';
};

for (const row of input) {
  let coords = [0, 0, 0];
  let c = '';
  for (let i = 0; i < row.length; i++) {
    c += row[i];
    if (['sw', 'ne', 'nw', 'se', 'e', 'w'].includes(c)) {
      coords = moveCube(coords, c);
      c = '';
    }
  }
  grid.set(coords.join('|'), grid.get(coords.join('|')) === 'B' ? 'W' : 'B');
}

let t = 0;
for (const v of grid.values()) {
  if (v === 'B') t++;
}
console.log(t);
