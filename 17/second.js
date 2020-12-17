const input = global.loadInput().lines();

let space = {};

function cube(spaceObj, x, y, z, w) {
  spaceObj[x] = spaceObj[x] || {};
  spaceObj[x][y] = spaceObj[x][y] || {};
  spaceObj[x][y][z] = spaceObj[x][y][z] || {};
  spaceObj[x][y][z][w] = spaceObj[x][y][z][w] || '.';
  return spaceObj[x][y][z][w];
}

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    cube(space, x, y, 0, 0);
    space[x][y][0][0] = input[y][x];
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
          nSpace[x][y][z] = nSpace[x][y][z] || {};

          for (const w of Object.keys((justFill ? space : nSpace)[x][y]).toInts()) {
            nSpace[x][y][z][w] = space[x][y][z][w];

            const current = space[x][y][z][w];
            let active = 0;
            for (const dX of [-1, 0, 1]) {
              for (const dY of [-1, 0, 1]) {
                for (const dZ of [-1, 0, 1]) {
                  for (const dW of [-1, 0, 1]) {
                    if (!dX && !dY && !dZ && !dW) continue;

                    active +=
                      cube(justFill ? nSpace : space, x + dX, y + dY, z + dZ, w + dW) === '#';
                  }
                }
              }
            }

            if (!justFill) {
              if (current === '#' && !(active === 2 || active === 3)) {
                nSpace[x][y][z][w] = '.';
              } else if (current !== '#' && active === 3) {
                nSpace[x][y][z][w] = '#';
              }
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
      for (const w of Object.keys(space[x][y][z])) {
        t += space[x][y][z][w] === '#';
      }
    }
  }
}
console.log(t);
