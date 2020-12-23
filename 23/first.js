const input = global.loadInput().lines();

let circle = input[0].split('').toInts();

let currentCup = 0;
for (let move = 0; move < 100; move++) {
  let targetCup = circle[currentCup];
  const used = circle.slice(currentCup + 1, currentCup + 4);
  const after = circle.slice(currentCup + 4).concat([targetCup]);

  let found = false;
  while (!found) {
    for (let searchOffset = 0; searchOffset < after.length; searchOffset++) {
      if (after[searchOffset] === targetCup - 1) {
        found = true;
        circle = [...after.slice(0, searchOffset + 1), ...used, ...after.slice(searchOffset + 1)];
        break;
      }
    }
    if (!found) {
      targetCup--;
      if (targetCup < 0) targetCup = Math.max(...circle) + 1;
    }
  }
}

console.log(circle.join('').split('1').reverse().join(''));
