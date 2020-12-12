const input = global.loadInput().lines();

let grid = [];
for (let r = 0; r < input.length; r++) {
  grid.push([]);
  for (let c = 0; c < input[r].length; c++) {
    grid[r].push(input[r][c]);
  }
}

let changed = true;
let x = 0;
while (changed) {
  x++;
  changed = false;
  const nGrid = [...grid.map((r) => [...r])];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const current = grid[r][c];
      nGrid[r][c] = current;
      if (current === '.') continue;

      const adj = [];
      for (const dR of [-1, 0, 1]) {
        for (const dC of [-1, 0, 1]) {
          if (!dR && !dC) continue;
          let target = '.';
          let mult = 1;
          while (target === '.') {
            target = (grid[r + dR * mult] || [])[c + dC * mult];
            mult++;
          }
          adj.push(target);
        }
      }
      if (current === 'L') {
        if (adj.filter((v) => v === '#').length === 0) {
          nGrid[r][c] = '#';
          changed = true;
        }
      } else {
        if (adj.filter((v) => v === '#').length >= 5) {
          nGrid[r][c] = 'L';
          changed = true;
        }
      }
    }
  }
  grid = nGrid;
}

console.log(grid.reduce((accum, r) => accum + r.reduce((acc, v) => acc + (v === '#'), 0), 0));
