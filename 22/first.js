const input = global.loadInput().lines();

const player1 = [];
const player2 = [];
let currentPlayer = player1;
for (const line of input) {
  if (line === 'Player 1:') continue;
  if (!line) continue;
  if (line === 'Player 2:') {
    currentPlayer = player2;
    continue;
  }
  currentPlayer.push(line.int());
}

while (player1.length && player2.length) {
  const p1 = player1.shift();
  const p2 = player2.shift();
  if (p1 > p2) {
    player1.push(p1, p2);
  } else {
    player2.push(p2, p1);
  }
}

const win = player1.length ? player1 : player2;
let t = 0;
for (let i = 1; i <= win.length; i++) {
  t += i * win[win.length - i];
}
console.log(t);
