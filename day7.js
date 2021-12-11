import fs from "fs";

const fileContent = fs.readFileSync("day7.txt", "utf8");
const input = fileContent.split(',').map((item) => Number(item));

//PART-ONE
// const max = Math.max.apply(null, input);
//
// let min;
// for (let i = 0; i<=max; i++) {
//   const result = input.reduce((preValue, currentValue) => preValue + Math.abs(currentValue - i)) - i;
//   if (i === 0) {
//     min = result;
//   }
//   if (result < min) {
//     min = result
//   }
// }
// console.log(min);



//PART-TWO
const max = Math.max.apply(null, input);
let min = max;

for (let i = 0; i<=max; i++) {
  const res = input.reduce((total, amount) => {
    total.push(sum(Math.abs(amount - i)));
    return total;
  }, []).reduce((prev, curr) => prev + curr);
  if (res < min || i === 0) {
    min = res
  }
}

console.log(min);

function sum(number) {
  const arr = [...Array(number + 1).keys()];
  if (!arr.length) {
    return 0
  }
  return arr.reduce((prev, curr) => prev + curr);
}
