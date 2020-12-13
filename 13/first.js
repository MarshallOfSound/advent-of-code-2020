const input = global.loadInput().lines();

const time = input[0].int();
const buses = [];
for (const bus of input[1].split(',')) {
  if (bus === 'x') continue;
  buses.push(bus.int());
}
let min = Number.POSITIVE_INFINITY;
let m = null;
for (const bus of buses) {
  const d = Math.floor(time / bus);
  const v = (d + 1) * bus;
  const delta = v - time;
  if (delta < min) {
    min = delta;
    m = bus;
  }
}
console.log(min * m);
