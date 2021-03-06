import fs from "fs";

// const input = [
// [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
// [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
// [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
// [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
// [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]
// ]


const fileContent = fs.readFileSync("./textInput/day9/day9.txt", "utf8");
let input = fileContent.split('\n').map((item) => item.split(''));

input = input.slice(0, input.length - 1);
console.log(input);
class Coordinate {
  constructor(coordinateX, coordinateY, value) {
    this.x = coordinateX;
    this.y = coordinateY;
    this.value = value;
  }
}

const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
let queue = [];

for (let i = 0; i<input.length; i++) {
  for (let j = 0; j<input[0].length; j++) {
    queue.push(new Coordinate(j, i, Number(input[i][j])))
  }
}

let cells = [];
while (queue.length>0) {
  const current = queue[0];
  queue.shift();
  let count = 0;
  for (let n = 0; n < directions.length; n++) {
    const neighbourX = current.x + directions[n][0];
    const neighbourY = current.y + directions[n][1];
    if (neighbourX < input[0].length && neighbourY < input.length && neighbourX >= 0 && neighbourY >= 0) {
      if (Number(input[neighbourY][neighbourX]) > current.value) {
        count += 1
      }
    } else {
      count += 1
    }
  }
  if (count === 4) {
    cells.push(current)
  }
}
console.log(cells);
const result = cells.map((current) => current.value + 1).reduce((prev, curr) => prev + curr);
console.log(result);
