const res = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

let increase = 0;
//PART-ONE
// for (let i = 1; i<=res.length; i++) {
//   if (res[i] > res[i-1]) {
//     increase +=1
//   }
// }

//PART-TWO
for (let i = 3; i<=res.length; i++) {
  const sum1 = res[i-1] + res[i-2] + res[i-3];
  const sum2 = res[i] + res[i-1] + res[i-2];
  if (sum2 > sum1) {
    increase = increase + 1
  }
}
