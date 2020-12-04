const input = global.loadInput().lines();

const grid = [];
for (const row of input) {
  grid.push(row.split(''));
}

const vals = [];

for (const [dC, dR] of [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]) {
  let r = 0;
  let c = 0;
  let trees = 0;
  while (r < grid.length) {
    if (grid[r][c % grid[r].length] === '#') {
      trees++;
    }
    r += dR;
    c += dC;
  }
  vals.push(trees);
}

console.log(vals.reduce((m, a) => m * a, 1));
