const input = global.loadInput().lines();

let mask;
const mem = {};
for (const row of input) {
  if (row.startsWith('mask = ')) {
    mask = row.substr('mask = '.length);
  } else {
    const [, indexS, nS] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(row);
    const binIndexS = indexS.int().toString(2).split('');
    while (binIndexS.length < mask.length) {
      binIndexS.unshift('0');
    }
    const flexiBits = [];
    for (let i = mask.length - 1; i >= 0; i--) {
      const binI = binIndexS.length - (mask.length - i);
      if (mask[i] === '1') binIndexS[binI] = mask[i];
      if (mask[i] === 'X') flexiBits.push(i);
    }
    const perms = [binIndexS];
    for (const flexiBit of flexiBits) {
      let toggleBit = '0';
      if (perms[0][flexiBit] === '0') {
        toggleBit = '1';
      }
      perms.push(...perms.map((p) => [...p].map((c, k) => (k === flexiBit ? toggleBit : c))));
    }
    const nSI = nS.int();
    for (const perm of perms) {
      mem[parseInt(perm.join(''), 2)] = nSI;
    }
  }
}
let t = 0;
for (const n of Object.keys(mem)) {
  t += mem[n];
}
console.log(t);
