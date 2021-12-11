import fs from 'fs'

let input = [];
let fileContent = 1
function reader() {
  fileContent = fs.readFileSync("day2.txt", "utf8");
  input.push(fileContent);
}
reader()
input =  input[0].split('\n').map((item) => item.split(' '));

// input = [['forward', 5],
//   ['down', 5],
//   ['forward', 8],
//   ['up', 3],
//   ['down', 8],
//   ['forward', 2]];

const directions = {
  forward: 'forward',
  down: 'down',
  up: 'up'
}

//PART-ONE

// for (let i = 0; i<input.length; i++) {
//   switch (input[i][0]) {
//     case directions.forward: {
//       start.x = start.x + Number(input[i][1])
//       break;
//     }
//     case directions.down: {
//       start.y = start.y + Number(input[i][1])
//       break;
//     }
//     case directions.up: {
//       start.y = start.y - Number(input[i][1])
//     }
//   }
// }

const start = {x: 0, depth: 0, aim: 0};

for (let i = 0; i<input.length; i++) {
  switch (input[i][0]) {
    case directions.forward: {
      start.x = start.x + Number(input[i][1])
      start.depth = start.depth + Number(input[i][1])*start.aim
      break;
    }
    case directions.down: {
      start.aim = start.aim + Number(input[i][1])
      break;
    }
    case directions.up: {
      start.aim = start.aim - Number(input[i][1])
    }
  }
}

console.log(start.depth * start.x);


