const input = global.loadInput().lines();

let _circle = input[0].split('').toInts();

const SIZE = 1000000;

const nodeLookup = new Map();

const circle = {
  label: _circle.shift(),
  next: null,
};
nodeLookup.set(circle.label, circle);
let currentNode = circle;
while (_circle.length) {
  currentNode.next = {
    label: _circle.shift(),
    next: null,
  };
  currentNode = currentNode.next;
  nodeLookup.set(currentNode.label, currentNode);
}
for (let i = 10; i <= SIZE; i++) {
  currentNode.next = {
    label: i,
    next: null,
  };
  currentNode = currentNode.next;
  nodeLookup.set(currentNode.label, currentNode);
}
currentNode.next = circle;

let currentCup = circle;
for (let move = 0; move < 10000000; move++) {
  // +1
  const detachedStart = currentCup.next;

  let target = null;
  let offset = 1;
  while (
    !target ||
    target === detachedStart ||
    target === detachedStart.next ||
    target === detachedStart.next.next
  ) {
    if (currentCup.label - offset <= 0) {
      offset = -SIZE;
    }
    target = nodeLookup.get(currentCup.label - offset);
    offset++;
  }

  currentCup.next = detachedStart.next.next.next;
  const tmp = target.next;
  target.next = detachedStart;
  detachedStart.next.next.next = tmp;

  currentCup = currentCup.next;
}

console.log('Done');
console.log(nodeLookup.get(1).next.label * nodeLookup.get(1).next.next.label);
