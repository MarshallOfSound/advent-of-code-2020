const input = global.loadInput().lines();

let space = {};

function cube(spaceObj, x, y, z) {
  spaceObj[x] = spaceObj[x] || {};
  spaceObj[x][y] = spaceObj[x][y] || {};
  spaceObj[x][y][z] = spaceObj[x][y][z] || '.';
  return spaceObj[x][y][z];
}

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    cube(space, x, y, 0);
    space[x][y][0] = input[y][x];
  }
}

function cycle() {
  const nSpace = {};
  for (const justFill of [true, false]) {
    for (const x of Object.keys(justFill ? space : nSpace).toInts()) {
      nSpace[x] = nSpace[x] || {};

      for (const y of Object.keys((justFill ? space : nSpace)[x]).toInts()) {
        nSpace[x][y] = nSpace[x][y] || {};

        for (const z of Object.keys((justFill ? space : nSpace)[x][y]).toInts()) {
          nSpace[x][y][z] = space[x][y][z];
          // console.log(justFill, x, y, z);

          const current = space[x][y][z];
          let active = 0;
          for (const dX of [-1, 0, 1]) {
            for (const dY of [-1, 0, 1]) {
              for (const dZ of [-1, 0, 1]) {
                if (!dX && !dY && !dZ) continue;

                active += cube(justFill ? nSpace : space, x + dX, y + dY, z + dZ) === '#';
              }
            }
          }

          if (!justFill) {
            if (current === '#' && !(active === 2 || active === 3)) {
              nSpace[x][y][z] = '.';
            } else if (current !== '#' && active === 3) {
              nSpace[x][y][z] = '#';
            } else {
              nSpace[x][y][z] = space[x][y][z];
            }
          }
        }
      }
    }
  }
  space = nSpace;
}

function pSpace(spaceObj, z) {
  const rows = {};
  for (const x of Object.keys(spaceObj)
    .toInts()
    .sort((a, b) => a - b)) {
    for (const y of Object.keys(spaceObj[x])
      .toInts()
      .sort((a, b) => a - b)) {
      rows[y] = rows[y] || [];
      rows[y].push(spaceObj[x][y][z] || '-');
    }
  }
  console.log(
    `Z=${z}\n` +
      Object.keys(rows)
        .toInts()
        .sort((a, b) => a - b)
        .map((r) => rows[r].join(''))
        .join('\n'),
    '\n',
  );
}

cycle();
cycle();
cycle();
cycle();
cycle();
cycle();

let t = 0;
for (const x of Object.keys(space)) {
  for (const y of Object.keys(space[x])) {
    for (const z of Object.keys(space[x][y])) {
      t += space[x][y][z] === '#';
    }
  }
}
console.log(t);
