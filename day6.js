import fs from 'fs'

//PART-ONE
const fileContent = fs.readFileSync("day6.txt", "utf8");
const input = fileContent.split(',').map((item) => Number(item));

// function counter(step, state) {
//   if (step === 0) {
//       return state;
//   }
//  state = state.map((item) => item - 1);
//  const nulls = state.filter((item) => item === -1);
//  state = state.map((item) => {
//   if (item === -1) {
//       return 6
//   }
//   return item
// })
// nulls.forEach((item) => state.push(8))
// return counter(step - 1, state)
// }
//
// const result = counter(80, input);
// console.log(result.length);


//PART-TWO
const numbers = [];
for (let j = 0; j<=8; j++) {
  numbers.push(input.filter((item) => item === j).length);
}

function count(state, step) {
  let newState = [];
  if (step === 0) {
    return state;
  }
  for (let j = 0; j<=8; j++) {
    if (j === 6) {
      newState.push(state[j+1] + state[0])
    }
    else if (j === 8) {
      newState.push(state[0])
    } else {
      newState.push(state[j+1])
    }
  }
  return count(newState, step - 1)
}

const step = 256;
const result = count(numbers, step);
const sum = result.reduce((accumulator, current) => accumulator + current)
console.log(sum);
