const input = global.loadInput().lines();

let shipX = 0;
let shipY = 0;
let wayX = 10;
let wayY = 1;
for (const row of input) {
  let char = row[0];
  let n = row.substr(1).int();
  if (char === 'R') {
    char = 'L';
    if (n === 90) n = 270;
    else if (n === 270) n = 90;
  }
  if (char === 'L') {
    const tY = wayY;
    const tX = wayX;
    if (n === 90) {
      wayX = -tY;
      wayY = tX;
    } else if (n === 180) {
      wayX = -tX;
      wayY = -tY;
    } else if (n === 270) {
      wayX = tY;
      wayY = -tX;
    }
  } else if (char === 'R') {
    throw 'a';
  } else if (char === 'F') {
    shipX += wayX * n;
    shipY += wayY * n;
  }

  if (char === 'N') {
    wayY += n;
  } else if (char === 'S') {
    wayY -= n;
  } else if (char === 'E') {
    wayX += n;
  } else if (char === 'W') {
    wayX -= n;
  }
}

console.log(shipX, shipY, Math.abs(shipX) + Math.abs(shipY));
