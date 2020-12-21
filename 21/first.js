const input = global.loadInput().lines();

const al = {};
const allIngredients = new Set();
const counts = {};

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
  for (const i of ingredients) {
    counts[i] = counts[i] || 0;
    counts[i]++;
    allIngredients.add(i);
  }
}

const goodIngredients = [...allIngredients].filter((thing) =>
  Object.keys(al).every((key) => !al[key].includes(thing)),
);
console.log(goodIngredients.reduce((n, i) => counts[i] + n, 0));
