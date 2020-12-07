const input = global.loadInput().lines();

const g = new Map();
for (const row of input) {
  const [, container, contents] = /(.+) bags contain ((?:[^,]+[\.,]?)+)\./.exec(row);
  if (contents === 'no other bags') continue;

  const contentsTypes = contents.split(', ');
  const contentsDict = {};
  for (const contentsType of contentsTypes) {
    const [, n, bag] = /([0-9]+) (.+) bags?$/.exec(contentsType);
    contentsDict[bag] = n.int();
  }
  g.set(container, contentsDict);
}

let bagsFound = 0;
function bfs(from, mult = 1) {
  const t = g.get(from);
  if (!t) return;
  for (const key of Object.keys(t)) {
    bagsFound += t[key] * mult;
    bfs(key, mult * t[key], visited);
  }
}

bfs('shiny gold');

console.log(bagsFound);
