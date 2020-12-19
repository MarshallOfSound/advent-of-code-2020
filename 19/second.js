const input = global.loadInput().lines();

const things = [];

const rules = new Map();

const rule11Gen = [];
// 20 seems high enough...
for (let i = 1; i < 20; i++) {
  rule11Gen.push(Array(i).fill('42').join(' ') + ' ' + Array(i).fill('31').join(' '))
}
const rule11 = rule11Gen.join(' | ');

for (const row of input) {
  if (/^[0-9]+:/.test(row)) {
    let [ruleS, ruleText] = row.split(':');
    const rule = ruleS.int();
    if (rule === 8) {
      ruleText = '42 | 42 8';
    } else if (rule === 11) {
      ruleText = rule11;
    }
    const dependencies = [];
    if (/[0-9]/.test(ruleText)) {
      if (ruleText.includes('|')) {
        const parts = ruleText.split('|').map((s) => s.trim());
        for (const p of parts) {
          const all = p.split(' ');
          dependencies.push(...all.map((s) => s.int()));
        }
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
  let stuck = true;
  for (const k of [...rules.keys()]) {
    const o = rules.get(k);
    if (!o.regexS && o.dependencies.every((dep) => rules.get(dep).regexS)) {
      stuck = false;
      if (o.ruleText.includes('|')) {
        const all = o.ruleText
          .split('|')
          .map((s) => genReg(s.trim()))
          .map((s) => `(?:${s})`)
          .join('|');
        o.regexS = `(?:${all})`;
      } else {
        const regexS = o.regexS || genReg(o.ruleText);
        o.regexS = `(?:${regexS})`;
      }
    }
  }

  if (stuck) {
    rules.get(8).regexS = `(?:(?:${rules.get(42).regexS})+)`;
  }
}

const r = new RegExp('^' + rules.get(0).regexS + '$');
let t = 0;

for (const thing of things) {
  t += r.test(thing);
}

console.log(t);
