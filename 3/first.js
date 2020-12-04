const input = global.loadInput().lines();

const grid = [];
for (const row of input) {
  grid.push(row.split(''));
}

let r = 0;
let c = 0;
let trees = 0;
while (r < grid.length) {
  if (grid[r][c % grid[r].length] === '#') {
    trees++;
  }
  r += 1;
  c += 3;
}
console.log(trees);
