const _input = global.loadInput().lines();

const _inputs = [];
for (let i = 0; i < _input.length; i++) {
  let val = _input[i];
  if (_input[i].startsWith('jmp')) {
    val = _input[i].replace('jmp', 'nop');
  } else if (_input[i].startsWith('nop')) {
    val = _input[i].replace('nop', 'jmp');
  }
  _inputs.push([..._input.slice(0, i), val, ..._input.slice(i + 1)]);
}

for (const input of _inputs) {
  const state = {
    currentInstruction: 0,
    accumulator: 0,
    run: new Set(),
  };
  while (!state.run.has(state.currentInstruction)) {
    state.run.add(state.currentInstruction);
    const row = input[state.currentInstruction];
    if (!row) {
      console.log(state.accumulator);
      process.exit(0);
    }

    const [cmd, n] = row.split(' ');
    switch (cmd) {
      case 'nop': {
        state.currentInstruction++;
        break;
      }
      case 'acc': {
        state.currentInstruction++;
        state.accumulator += n.int();
        break;
      }
      case 'jmp': {
        state.currentInstruction += n.int();
        break;
      }
      default: {
        throw 'a';
      }
    }
  }
}
