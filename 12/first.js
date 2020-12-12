const input = global.loadInput().lines();

let angle = 90;
let x = 0;
let y = 0;
for (const row of input) {
  let char = row[0];
  const n = row.substr(1).int();
  if (char === 'L') {
    angle -= n;
  } else if (char === 'R') {
    angle += n;
  } else if (char === 'F') {
    if (angle === 0) char = 'N';
    else if (angle === 90) char = 'E';
    else if (angle === 180) char = 'S';
    else if (angle === 270) char = 'W';
    else throw angle;
  }

  while (angle < 0) {
    angle += 360;
  }
  while (angle >= 360) {
    angle -= 360;
  }

  if (char === 'N') {
    y += n;
  } else if (char === 'S') {
    y -= n;
  } else if (char === 'E') {
    x += n;
  } else if (char === 'W') {
    x -= n;
  }
  console.log(x, y, x + y);
}

console.log(x, y, Math.abs(x) + Math.abs(y));
