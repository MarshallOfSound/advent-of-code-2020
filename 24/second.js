const input = global.loadInput().lines();

let grid = new Map();

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

const directions = ['e', 'w', 'ne', 'nw', 'se', 'sw'];

for (let d = 0; d < 100; d++) {
  const newGrid = new Map();
  let visited = new Set();
  for (const _coords of grid.keys()) {
    for (const coords of directions.map((d) =>
      moveCube(_coords.split('|').toInts(), d).join('|'),
    )) {
      if (visited.has(coords)) continue;
      visited.add(coords);
      const [x, y, z] = coords.split('|').toInts();
      const current = grid.get(coords);
      const bAdj = directions.reduce(
        (s, d) => s + (grid.get(moveCube([x, y, z], d).join('|')) === 'B'),
        0,
      );
      if (current === 'B') {
        if (bAdj === 0 || bAdj > 2) {
          newGrid.set(coords, 'W');
        } else {
          newGrid.set(coords, 'B');
        }
      } else {
        if (bAdj === 2) {
          newGrid.set(coords, 'B');
        } else {
          newGrid.set(coords, 'W');
        }
      }
    }
  }
  grid = newGrid;
}

let t = 0;
for (const v of grid.values()) {
  if (v === 'B') t++;
}
console.log(t);
