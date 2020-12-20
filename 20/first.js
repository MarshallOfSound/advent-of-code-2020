const input = global.loadInput().blocks();

const borders = new Map();

for (const block of input) {
  const [, tileID] = /([0-9]+)/.exec(block[0]);
  const border1 = block[1];
  const border2 = block[block.length - 1];
  let border3 = '';
  let border4 = '';

  for (let i = 1; i < block.length; i++) {
    if (!block[i].length) continue;
    border3 += block[i][0];
    border4 += block[i][block[i].length - 1];
  }

  for (const b of [border1, border2, border3, border4]) {
    let bS = b.reverse() < b ? b.reverse() : b;
    borders.set(bS, (borders.get(bS) || []).concat([tileID]));
  }
}

const edges = [...borders.keys()]
  .filter((b) => borders.get(b).length === 1)
  .map((b) => borders.get(b)[0]);

const edgeCounts = {};
for (const edge of edges) {
  edgeCounts[edge] = (edgeCounts[edge] || 0) + 1;
}

let m = 1;
for (const edge of Array.from(new Set(edges))) {
  if (edgeCounts[edge] === 2) {
    console.log('Corner:', edge);
    m *= edge.int();
  }
}
console.log(m);
