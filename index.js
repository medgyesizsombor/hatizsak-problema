let numbersOfMushrooms = 6;
let capacity = 25;
let mushrooms = [
  ["C", 4],
  ["R", 8],
  ["L", 12],
  ["C", 10],
  ["L", 2],
  ["R", 2],
];

/**
 * check if there is csiperke in mushrooms, true if yes
 * @param mushrooms
 */
const includeCsiperke = (mushrooms) => {
  return mushrooms.some((m) => m[1].includes("C"));
};

/**
 * find the largest mushroom
 * @param mushrooms
 */
const largestMushroom = (mushrooms) => {
  let sortedMushrooms = mushrooms.sort((a, b) => b[2] - a[2]);
  return sortedMushrooms[0];
};

/**
 * find the largest mushroom but only csiperke, and roka
 * @param mushrooms
 */
const largestMushroomWithoutL = (mushrooms) => {
  const sortedMushrooms = mushrooms.sort((a, b) => b[2] - a[2]);
  const filteredL = sortedMushrooms.filter((m) => m[1] !== "L");
  return filteredL[0];
};

/**
 * get all the mushroom, which has the same weight as the current
 * @param mushrooms
 * @param currentMushroom
 */
const getAllTheSameWeight = (mushrooms, currentMushroom) => {
  return mushrooms.filter((m) => m[2] === currentMushroom[2]);
};

/**
 * give index to mushrooms to make them unique
 * @param mushrooms
 */
const giveIndexToTheMushrooms = (mushrooms) => {
  for (let i = 0; i < mushrooms.length; i++) {
    mushrooms[i].unshift(i);
  }
};

/**
 * sort the mushrooms by type and put them in a new array
 * @param mushrooms
 */
const orderedByValue = (mushrooms) => {
  let csiperke = [];
  let roka = [];
  let lila = [];
  let result = [];

  for (let i = 0; i < mushrooms.length; i++) {
    if (mushrooms[i][1].includes("C")) {
      csiperke.push(mushrooms[i]);
    } else if (mushrooms[i][1].includes("R")) {
      roka.push(mushrooms[i]);
    } else if (mushrooms[i][1].includes("L")) {
      lila.push(mushrooms[i]);
    }
  }

  result = [...csiperke, ...roka, ...lila];
  return result;
};

/**
 * counts the weight of mushrooms by type
 * @param mushrooms
 * @param type
 */
const createResult = (mushrooms, type) => {
  const mushs = mushrooms.filter((m) => m[1] === type);
  let sum = 0;
  for (let i = 0; i < mushs.length; i++) {
    sum += mushs[i][2];
  }
  return { count: mushs.length, sum };
};

/**
 * run all the logic of the task
 * @param numbersOfMushrooms
 * @param capacity
 * @param mushrooms
 */
const solve = (numbersOfMushrooms, capacity, mushrooms) => {
  if (numbersOfMushrooms !== mushrooms.length) {
    return;
  }
  
  giveIndexToTheMushrooms(mushrooms);
  console.log(mushrooms)

  let result = [];
  let max = 0;

  while (mushrooms.length > 0) {
    let largestM = largestMushroom(mushrooms);
    if (largestM[2] + max > capacity) {
      mushrooms = mushrooms.filter((m) => m[0] !== largestM[0]);
    } else {
      if (largestM[1].includes("L") && includeCsiperke(mushrooms)) {
        largestM = largestMushroomWithoutL(mushrooms);
        let sameMushrooms = getAllTheSameWeight(mushrooms, largestM);
        if (sameMushrooms.length >= 2) {
          largestM = orderedByValue(sameMushrooms)[0];
          result.push(largestM);
          max = max + largestM[2];
          mushrooms = mushrooms.filter((m) => m[0] !== largestM[0]);
        } else {
          result.push(largestM);
          max = max + largestM[2];
          mushrooms = mushrooms.filter((m) => m[0] !== largestM[0]);
        }
      } else {
        let sameMushrooms = getAllTheSameWeight(mushrooms, largestM);
        if (sameMushrooms.length >= 2) {
          largestM = orderedByValue(sameMushrooms)[0];
          result.push(largestM);
          max = max + largestM[2];
          mushrooms = mushrooms.filter((m) => m[0] !== largestM[0]);
        } else {
          result.push(largestM);
          max = max + largestM[2];
          mushrooms = mushrooms.filter((m) => m[0] !== largestM[0]);
        }
      }
    }
  }

  return { max, result };
};

console.time("Execution time");
let res = solve(numbersOfMushrooms, capacity, mushrooms);

console.log(res.result.length + " " + res.max);

let csiperke = createResult(res.result, "C");
console.log(csiperke.count + " " + csiperke.sum);

let roka = createResult(res.result, "R");
console.log(roka.count + " " + roka.sum);

let lila = createResult(res.result, "L");
console.log(lila.count + " " + lila.sum);

document.getElementById("sum").textContent = res.result.length + " " + res.max;
document.getElementById("csiperke").textContent =
  csiperke.count + " " + csiperke.sum;
document.getElementById("rokagomba").textContent = roka.count + " " + roka.sum;
document.getElementById("lilapereszke").textContent =
  lila.count + " " + lila.sum;

console.timeEnd("Execution time");
