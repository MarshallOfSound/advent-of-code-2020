const input = global.loadInput().lines();

const nums = input[0].split(',').toInts();

for (let turn = nums.length; turn <= 2020; turn++) {
  const last = nums[turn - 1];
  const lastTime = nums
    .slice(0, turn - 1)
    .reverse()
    .indexOf(last);
  if (lastTime === -1) {
    nums.push(0);
  } else {
    nums.push(lastTime + 1);
  }
}

console.log(nums[2019]);
