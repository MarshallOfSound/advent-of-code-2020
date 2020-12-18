const input = global.loadInput().lines();

function run(s) {
  const exp = s.replace(/ /g, '');
  const nStack = [];
  const opStack = [];
  let cN = '';
  for (const char of exp) {
    if (/[0-9]/.test(char)) {
      cN += char;
    } else {
      nStack.push(cN.int());
      cN = '';
      opStack.push(char);
    }
  }
  nStack.push(cN.int());
  let n = nStack.shift();
  while (nStack.length) {
    n = eval(`${n}${opStack.shift()}${nStack.shift()}`);
  }
  return n;
}

let t = 0;
for (const row of input) {
  const stack = [];
  let current = '';
  for (let i = 0; i < row.length; i++) {
    const c = row[i];
    if (c === '(') {
      stack.push(current);
      current = '';
    } else if (c === ')') {
      const n = run(current);
      current = stack.pop();
      current += n;
    } else {
      current += c;
    }
  }
  t += run(current);
}

console.log(t);
