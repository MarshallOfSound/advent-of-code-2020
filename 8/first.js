const input = global.loadInput().lines();

const state = {
  currentInstruction: 0,
  accumulator: 0,
  run: new Set(),
};

while (!state.run.has(state.currentInstruction)) {
  state.run.add(state.currentInstruction);
  const row = input[state.currentInstruction];
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
  }
}

console.log(state.accumulator);
