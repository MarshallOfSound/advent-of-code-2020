const input = global.loadInput().lines();

const things = [];

const rules = new Map();

for (const row of input) {
  if (/^[0-9]+:/.test(row)) {
    const [ruleS, ruleText] = row.split(':');
    const rule = ruleS.int();
    const dependencies = [];
    if (/[0-9]/.test(ruleText)) {
      if (ruleText.includes('|')) {
        if (ruleText.split('|').length !== 2) throw 'a';

        const [part1, part2] = ruleText.split('|').map((s) => s.trim());
        const all1 = part1.split(' ');
        const all2 = part2.split(' ');
        dependencies.push(...all1.map((s) => s.int()), ...all2.map((s) => s.int()));
      } else {
        const all = ruleText.trim().split(' ');
        dependencies.push(...all.map((s) => s.int()));
      }
    }

    rules.set(rule, {
      dependencies,
      ruleText: ruleText.trim(),
      regexS: dependencies.length === 0 ? ruleText.trim()[1] : null,
    });
  } else {
    things.push(row);
  }
}

const genReg = (ruleText) => {
  const things = ruleText
    .split(' ')
    .map((s) => s.trim().int())
    .map((rule) => rules.get(rule).regexS);
  return things.join('');
};

while ([...rules.keys()].some((k) => rules.get(k).regexS === null)) {
  for (const k of [...rules.keys()]) {
    const o = rules.get(k);
    if (!o.regexS && o.dependencies.every((dep) => rules.get(dep).regexS)) {
      if (o.ruleText.includes('|')) {
        const regexS1 = genReg(o.ruleText.split('|')[0].trim());
        const regexS2 = genReg(o.ruleText.split('|')[1].trim());
        o.regexS = `(?:(?:${regexS1})|(?:${regexS2}))`;
      } else {
        const regexS = o.regexS || genReg(o.ruleText);
        o.regexS = `(?:${regexS})`;
      }
    }
  }
}

const r = new RegExp('^' + rules.get(0).regexS + '$');
let t = 0;

for (const thing of things) {
  t += r.test(thing);
}

console.log(t);
