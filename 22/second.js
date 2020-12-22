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

function playGame(player1, player2) {
  let winner = null;
  const p1 = player1.shift();
  const p2 = player2.shift();
  if (player1.length >= p1 && player2.length >= p2) {
    const player1Copy = [...player1.slice(0, p1)];
    const player2Copy = [...player2.slice(0, p2)];
    const played = {};
    let w;
    while (player1Copy.length && player2Copy.length) {
      const key = [player1Copy.join('|'), player2Copy.join('|')].join(':');
      if (played[key]) {
        player1Copy.push(...player2Copy);
        while (player2Copy.length) player2Copy.shift();
        w = player1Copy;
        break;
      }
      played[key] = true;
      w = playGame(player1Copy, player2Copy);
    }
    if (w === player1Copy) {
      winner = player1;
    } else {
      winner = player2;
    }
  } else {
    if (p1 > p2) {
      winner = player1;
    } else {
      winner = player2;
    }
  }

  winner.push(...(winner === player1 ? [p1, p2] : [p2, p1]));
  return winner;
}

while (player1.length && player2.length) {
  playGame(player1, player2);
}

const win = player1.length ? player1 : player2;
let t = 0;
for (let i = 1; i <= win.length; i++) {
  t += i * win[win.length - i];
}
console.log(t);
