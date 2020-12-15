const input = global.loadInput().lines();

const nums = input[0].split(',').toInts();

const ixs = new Map();
for (let i = 0; i < nums.length - 1; i++) {
  ixs.set(nums[i], i);
}

let last = nums[nums.length - 1];
for (let turn = nums.length; turn <= 30000000 - 1; turn++) {
  let newN = 0;
  const lastIx = ixs.get(last);
  if (lastIx !== undefined) {
    newN = turn - lastIx - 1;
  }
  ixs.set(last, turn - 1);
  last = newN;
}

console.log(last);
