const input = global.loadInput().lines();

const al = {};

for (const row of input) {
  const [, _ingredients, _allergens] = /^(.+?) \(contains (.+?)\)$/.exec(row);
  const allergens = _allergens.split(', ').map((s) => s.trim());
  const ingredients = _ingredients.split(' ').map((s) => s.trim());
  for (const allergen of allergens) {
    if (!al[allergen]) {
      al[allergen] = ingredients;
    } else {
      al[allergen] = al[allergen].filter((thing) => ingredients.includes(thing));
    }
  }
}

const final = {};
while (Object.keys(al).length) {
  const single = Object.keys(al).find((k) => al[k].length === 1);
  final[single] = al[single][0];
  delete al[single];
  for (const k of Object.keys(al)) {
    al[k] = al[k].filter((thing) => thing !== final[single]);
  }
}

console.log(
  Object.keys(final)
    .sort()
    .map((key) => final[key])
    .join(','),
);
