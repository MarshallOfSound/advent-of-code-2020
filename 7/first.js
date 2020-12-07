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

function dfs(from, to) {
  const t = g.get(from);
  if (!t) return false;
  for (const key of Object.keys(t)) {
    if (key === to) return true;
    if (dfs(key, to)) return true;
  }
  return false;
}

let t = 0;
for (const start of g.keys()) {
  t += dfs(start, 'shiny gold');
}
console.log(t);
