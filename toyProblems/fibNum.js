/*
Write a method in Java, JavaScript, Objective-C or Swift to generate the nth
Fibonacci number (1, 1, 2, 3, 5, 8, 13, 21, 34…)
  A) Recursive approach
  B) Iterative approach
*/

//  Iterative approach
findFibNum = n => {
  const numbers = [0, 1];
  let i = 2;

  if (n === 0) return console.log("Nth number is: ", 0);
  if (n === 1) return console.log("Nth number is: ", 1);

  while (i <= n) {
    numbers.push(numbers[i - 2] + numbers[i - 1]);
    i += 1;
  }

  console.log("Nth number is: ", numbers[numbers.length - 1]);
}

// Recursive approach
// findFibNum = (n, numbers, i) => {
//   if (n === 0) return console.log("Nth number is: ", 0);
//   if (n === 1) return console.log("Nth number is: ", 1);
//
//   if (!numbers) {
//     numbers = [0, 1];
//     i = 2;
//   }
//
//   if (i <= n) {
//     numbers.push(numbers[i - 2] + numbers[i - 1]);
//     i += 1;
//
//     return findFibNum(n, numbers, i);
//   }
//
//   // console.log("numbers list: ", numbers);
//   console.log("Nth number is: ", numbers[numbers.length - 1]);
// }

findFibNum(0);
findFibNum(1);
findFibNum(5);
findFibNum(10);
findFibNum(15);
