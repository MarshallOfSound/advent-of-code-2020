const input = global.loadInput().blocks();

const borders = new Map();
const tiles = new Map();

// Edges are [top, right, bottom, left]

for (const block of input) {
  const [, tileID] = /([0-9]+)/.exec(block[0]);
  const border1 = block[1];
  let border2 = '';
  const border3 = block[block.length - 1];
  let border4 = '';

  for (let i = 1; i < block.length; i++) {
    if (!block[i].length) continue;
    border4 += block[i][0];
    border2 += block[i][block[i].length - 1];
  }

  const bSArr = [border1, border2, border3, border4].map(sortSide);
  tiles.set(tileID, {
    sorted: bSArr,
    real: [border1, border2, border3, border4],
    content: block.slice(1),
  });
  for (const bS of bSArr) {
    borders.set(bS, (borders.get(bS) || []).concat([tileID]));
  }
}

const edges = [...borders.keys()]
  .filter((b) => borders.get(b).length === 1)
  .map((b) => borders.get(b)[0]);

const edgeCounts = {};
for (const edge of edges) {
  edgeCounts[edge] = (edgeCounts[edge] || 0) + 1;
}

const corners = [];
for (const edge of Array.from(new Set(edges))) {
  if (edgeCounts[edge] === 2) {
    corners.push(edge);
  }
}

function sortSide(side) {
  return side.reverse() < side ? side.reverse() : side;
}

const offsetToEdge = [3, 0, 1, 2];
const nextRowOffsetToEdge = [0, 1, 2, 3];
const squareSize = Math.sqrt([...tiles.keys()].length);

const rotateAndFlip = (_edges, flip, offset, indexToFlip) => {
  let edges = [..._edges];
  if (flip) {
    if (indexToFlip === 0 || indexToFlip === 2) {
      edges[0] = edges[0].reverse();
      edges[2] = edges[2].reverse();
      const t = edges[1];
      edges[1] = edges[3];
      edges[3] = t;
    } else {
      edges[1] = edges[1].reverse();
      edges[3] = edges[3].reverse();
      const t = edges[0];
      edges[0] = edges[2];
      edges[2] = t;
    }
  }

  while (offset > 0) {
    edges = [edges[1], edges[2].reverse(), edges[3], edges[0].reverse()];
    offset--;
  }
  return edges;
};

// Determined manually that the first corner (3557) is not rotated or flipped
// Using that corner as an anchor we can calculate everything to the right
// until we reach another corner
const grid = [
  [
    {
      id: corners[0],
      edges: tiles.get(corners[0]).real,
      flipped: false,
      offset: 0,
      flippedIndex: 0,
    },
  ],
];
for (let row = 0; row < squareSize; row++) {
  grid[row] = grid[row] || [];
  if (row > 0) {
    // Determine the thing BELOW the the row above so we can continue calculating the entire row
    // For row=0 though we already have it because we had a starting corner
    const bottomSide = grid[row - 1][0].edges[2];
    const sortedSide = sortSide(bottomSide);
    const matched = borders.get(sortedSide);
    const other = matched.filter((n) => n !== grid[row - 1][0].id)[0];
    const otherInfo = tiles.get(other);
    let offset = 0;
    for (offset = 0; offset < 4; offset++) {
      const targetEdge = otherInfo.sorted[nextRowOffsetToEdge[offset]];
      if (targetEdge === sortedSide) {
        break;
      }
    }
    let flipped = false;
    let newEdges = rotateAndFlip(otherInfo.real, false, offset, nextRowOffsetToEdge[offset]);
    if (newEdges[0] !== bottomSide) {
      flipped = true;
      newEdges = rotateAndFlip(otherInfo.real, true, offset, nextRowOffsetToEdge[offset]);
    }
    if (newEdges[0] !== bottomSide) throw 'wat';
    grid[row][0] = {
      id: other,
      edges: newEdges,
      flipped,
      offset,
      flippedIndex: nextRowOffsetToEdge[offset],
    };
  }

  for (let i = 0; i < squareSize - 1; i++) {
    const rightSide = grid[row][i].edges[1];
    const sortedSide = sortSide(rightSide);
    const matched = borders.get(sortedSide);
    const other = matched.filter((n) => n !== grid[row][i].id)[0];
    const otherInfo = tiles.get(other);
    let offset = 0;
    for (offset = 0; offset < 4; offset++) {
      const targetEdge = otherInfo.sorted[offsetToEdge[offset]];
      if (targetEdge === sortedSide) {
        break;
      }
    }
    let flipped = false;
    let newEdges = rotateAndFlip(otherInfo.real, false, offset, offsetToEdge[offset]);
    if (newEdges[3] !== rightSide) {
      flipped = true;
      newEdges = rotateAndFlip(otherInfo.real, true, offset, offsetToEdge[offset]);
    }
    if (newEdges[3] !== rightSide) {
      throw 'wat';
    }
    grid[row][i + 1] = {
      id: other,
      edges: newEdges,
      flipped,
      offset,
      flippedIndex: offsetToEdge[offset],
    };
  }
}

function flipEntireTile(_contents, shouldFlip, flippedIndex, offset) {
  let contents = [..._contents];
  if (shouldFlip) {
    if (flippedIndex === 0 || flippedIndex === 2) {
      contents = contents.map((r) => r.reverse());
    } else {
      contents = contents.reverse();
    }
  }

  while (offset > 0) {
    const newContents = Array(contents.length).fill('');
    for (let i = 0; i < contents.length; i++) {
      for (let c = 0; c < contents[0].length; c++) {
        newContents[contents.length - 1 - i] += contents[c][i];
      }
    }
    contents = newContents;
    offset--;
  }

  return contents;
}

const ocean = [];

for (let r = 0; r < grid.length; r++) {
  // Another 10 rows
  ocean.push(...Array(8).fill(''));
  for (let c = 0; c < grid[r].length; c++) {
    const gridItem = grid[r][c];
    const tile = tiles.get(gridItem.id);
    const { flipped, offset, flippedIndex } = gridItem;
    const transformedContent = flipEntireTile(tile.content, flipped, flippedIndex, offset);
    const trimmedContent = new Array(transformedContent.length - 2).fill('');
    for (let i = 1; i < transformedContent.length - 1; i++) {
      trimmedContent[i - 1] = transformedContent[i].substr(1, transformedContent[i].length - 2);
    }
    for (let i = 0; i < trimmedContent.length; i++) {
      ocean[ocean.length - trimmedContent.length + i] += trimmedContent[i];
    }
  }
}

// prettier-ignore
const seaMonster =
[`                  # `,
 `#    ##    ##    ###`,
 ` #  #  #  #  #  #   `];

const oceans = [];
for (const offset of [0, 1, 2, 3]) {
  for (const flip of [true, false]) {
    for (const flipIndex of [0, 1]) {
      oceans.push(flipEntireTile(ocean, flip, flipIndex, offset));
    }
  }
}

for (const pOcean of oceans) {
  const hashesFound = new Set();
  const hashesInMonster = new Set();
  let monsters = 0;

  for (let row = 0; row < pOcean.length; row++) {
    for (let col = 0; col < pOcean[row].length; col++) {
      if (pOcean[row][col] === '#') hashesFound.add(`${row}|${col}`);
    }
  }

  for (let row = 0; row < pOcean.length - seaMonster.length; row++) {
    for (let col = 0; col < pOcean[row].length - seaMonster[0].length; col++) {
      let foundMonster = true;
      const maybeMonsterHashes = new Set();

      for (let seaR = 0; seaR < seaMonster.length; seaR++) {
        for (let seaC = 0; seaC < seaMonster[seaR].length; seaC++) {
          const char = seaMonster[seaR][seaC];
          if (char === '#') {
            if (pOcean[row + seaR][col + seaC] !== '#') {
              foundMonster = false;
            } else {
              maybeMonsterHashes.add(`${row + seaR}|${col + seaC}`);
            }
          }
        }
      }

      monsters += foundMonster;
      if (foundMonster) {
        for (const val of maybeMonsterHashes) {
          hashesInMonster.add(val);
        }
      }
    }
  }

  if (monsters) {
    console.log('Found:', monsters);
    console.log('Roughness:', hashesFound.size - hashesInMonster.size);
  }
}
