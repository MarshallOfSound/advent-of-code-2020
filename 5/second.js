const input = global.loadInput().lines();

const values = [];
for (const seat of input) {
  const row = seat.slice(0, 7);
  const col = seat.slice(7);
  let min = 0;
  let max = 127;
  for (const val of row) {
    if (val === 'F') {
      max = Math.floor((min + max) / 2);
    } else {
      min = Math.ceil((min + max) / 2);
    }
  }
  const r = min;
  min = 0;
  max = 7;
  for (const val of col) {
    if (val === 'L') {
      max = Math.floor((min + max) / 2);
    } else {
      min = Math.ceil((min + max) / 2);
    }
  }
  const c = min;
  const id = r * 8 + c;
  values.push(id);
}
for (const v of values) {
  if (values.includes(v + 2) && !values.includes(v + 1)) {
    console.log(v + 1);
  }
}
