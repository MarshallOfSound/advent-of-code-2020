const input = global.loadInput().lines();

let mask;
const mem = [];
for (const row of input) {
  if (row.startsWith('mask = ')) {
    mask = row.substr('mask = '.length);
  } else {
    const [, indexS, nS] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(row);
    const binS = nS.int().toString(2).split('');
    while (binS.length < mask.length) {
      binS.unshift('0');
    }
    for (let i = mask.length - 1; i >= 0; i--) {
      const binI = binS.length - (mask.length - i);
      if (mask[i] !== 'X') binS[binI] = mask[i];
    }
    mem[indexS.int()] = parseInt(binS.join(''), 2);
  }
}
let t = 0;
for (const n of mem) {
  if (n) t += n;
}
console.log(t);
