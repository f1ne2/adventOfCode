import _ from 'lodash';
import fs from "fs";

// const input = [[[22, 13, 17, 11,  0], [8,  2, 23, 4, 24], [21, 9, 14, 16, 7],
//   [6, 10, 3, 18, 5], [1, 12, 20, 15, 19]],
// [[3, 15, 0, 2, 22], [9, 18, 13, 17, 5], [19, 8, 7, 25, 23],
// [20, 11, 10, 24, 4], [14, 21, 16, 12, 6]],
// [[14, 21, 17, 24, 4], [10, 16, 15, 9, 19], [18, 8, 23, 26, 20],
//   [22, 11, 13, 6, 5], [2, 0, 12, 3, 7]]]
//
// const lottery = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];

const fileContent = fs.readFileSync("./textInput/day4/boards.txt", "utf8");

let input = fileContent
  .split('   ')[0]
  .split('\n\n')
  .map((item) => item.split('\n'));

input.pop();

for (let i = 0; i<input.length; i++) {
  for (let j = 0; j<input[i].length; j++) {
    input[i][j] = input[i][j].split(' ').filter((item) => item).map((item2) => Number(item2));
  }
}

const fileNumbers = fs.readFileSync("./textInput/day4/numbers.txt", "utf8");
const lottery = fileNumbers.split(',').map((item) => Number(item));

class Coordinate {
  constructor(value, isMarked) {
    this.value = value;
    this.isMarked = isMarked;
  }
}

for (let m = 0; m<input.length; m++) {
  for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input[0][0].length; j++) {
      input[m][i][j] = new Coordinate(input[m][i][j], false);
    }
  }
}

let result = 0;

// for (let i = 0; i<lottery.length; i++) {
//   mark(lottery[i])
//   const string = isWinString();
//   if (string.isWin) {
//     sum(string.board)
//     const output = sum(string.board)
//     result = output * lottery[i]
//     break;
//   }
//   const column = isWinColumn();
//   if (column.isWin) {
//     const output = sum(column.board)
//     result = output * lottery[i]
//     break;
//   }
// }
//
// console.log('result', result);
//
// function sum(boardNumber) {
//   let sum = 0;
//     for (let i = 0; i < input[boardNumber].length; i++) {
//       for (let j = 0; j < input[boardNumber][0].length; j++) {
//         if (!input[boardNumber][i][j].isMarked) {
//           sum = sum + input[boardNumber][i][j].value
//         }
//       }
//     }
//     return sum;
// }
//
// function mark(number) {
//   for (let m = 0; m < input.length; m++) {
//     for (let i = 0; i < input[0].length; i++) {
//       for (let j = 0; j < input[0][0].length; j++) {
//         if (input[m][j][i].value === number) {
//           input[m][j][i].isMarked = true;
//         }
//       }
//     }
//   }
// }
//
// function isWinColumn() {
//   for (let m = 0; m < input.length; m++) {
//     for (let i = 0; i < input[0][0].length; i++) {
//     let count = 0;
//     for (let j = 0; j < input[0].length; j++) {
//       if (input[m][j][i].isMarked) {
//         count += 1
//       }
//     }
//     if (count === input[m][0].length) {
//       return {isWin: true, board: m};
//     }
//     }
//   }
//   return {isWin: false, board: null}
// }
//
// function isWinString() {
//   for (let m = 0; m < input.length; m++) {
//     for (let i = 0; i < input[0].length; i++) {
//       let count = 0;
//       for (let j = 0; j < input[0][0].length; j++) {
//         if (input[m][i][j].isMarked) {
//           count += 1
//         }
//       }
//       if (count === input[0][0].length) {
//         return {isWin: true, board: m}
//       }
//     }
//   }
//   return {isWin: false, board: null}
// }

function main() {
  let winBoards;
  for (let i = 0; i < lottery.length; i++) {
    mark(lottery[i])
    winBoards = isWinString();
    if (winBoards.length && input.length > 1) {
      winBoards.map(item => input.splice(item, 1))
    }
    winBoards = isWinColumn();
    if (winBoards.length && input.length > 1) {
      winBoards.map(item => input.splice(item, 1))
    }
    if (input.length === 1) {
      return {number: lottery[i]}
    }
  }
}

const stoppedNumber = main()
console.log(stoppedNumber);
let winBoards;
for (let i = lottery.indexOf(stoppedNumber.number)+1; i < lottery.length; i++) {
  mark(lottery[i])
  winBoards = isWinString();
  if (winBoards.length) {
    result = sum() * lottery[i];
    break;
  }
  winBoards = isWinColumn();
  if (winBoards.length) {
    result = sum() * lottery[i]
    break;
  }
}
console.log('result', result);

function sum() {
  let sum = 0;
  for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input[0][0].length; j++) {
      if (!input[0][i][j].isMarked) {
        sum = sum + input[0][i][j].value
      }
    }
  }
  return sum;
}

function mark(number) {
  for (let m = 0; m < input.length; m++) {
    for (let i = 0; i < input[0].length; i++) {
      for (let j = 0; j < input[0][0].length; j++) {
        if (input[m][j][i].value === number) {
          input[m][j][i].isMarked = true;
        }
      }
    }
  }
}

function isWinColumn() {
  let winBoards = []
  for (let m = 0; m < input.length; m++) {
    for (let i = 0; i < input[0][0].length; i++) {
      let count = 0;
      for (let j = 0; j < input[0].length; j++) {
        if (input[m][j][i].isMarked) {
          count += 1
        }
      }
      if (count === input[m][0].length) {
        winBoards.push(m);
        break;
      }
    }
  }
  return winBoards
}

function isWinString() {
  let winBoards = [];
  for (let m = 0; m < input.length; m++) {
    for (let i = 0; i < input[0].length; i++) {
      let count = 0;
      for (let j = 0; j < input[0][0].length; j++) {
        if (input[m][i][j].isMarked) {
          count += 1
        }
      }
      if (count === input[0][0].length) {
        winBoards.push(m);
        break;
      }
    }
  }
  return winBoards
}

