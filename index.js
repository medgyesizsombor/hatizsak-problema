let mushrooms = ["L 10", "C 5", "L 6"];

const hasCsiperke = (mushrooms) => {
  for (let i = 0; i < mushrooms.length; i++) {
    if (mushrooms[i].includes("C")) {
      break;
    }
  }
};

const maxWeight = (a, b) => {
  if (a > b) {
    return a;
  } else {
    return b;
  }
};

const pickingMushroom = (mushroomNumber, capacity, mushrooms) => {
  let newArray = [];
  let maxArray = [];

  for (let i = 0; i < mushrooms.length; i++) {
    newArray.push(mushrooms[i].split(" "));
  }

  if (!hasCsiperke) {
    let max = 0;
    for (let i = 0; i < mushrooms.length - 1; i++) {
      if (max < maxWeight(Number(newArray[i][1]), Number(newArray[i + 1][1]))) {
        max = maxWeight(Number(newArray[i][1]), Number(newArray[i + 1][1]));
      }
    }
    console.log(max);
  }

  if (hasCsiperke) {
    let max = 0;
    for (let i = 0; i < mushrooms.length - 1; i++) {
      if (max < maxWeight(Number(newArray[i][1]), Number(newArray[i + 1][1]))) {
        if (Number(newArray[i][1]) > Number(newArray[i + 1][1]) && newArray[i][0].includes("L")) {
                if(Number(newArray[i + 1][1]) > max && !newArray[i + 1][0].includes("L") ) {
                max = newArray[i + 1][1];
                } else {
                    max = max;
                }
        } else if (Number(newArray[i][1]) < Number(newArray[i + 1][1]) && newArray[i + 1][0].includes("L")) {
                if (Number(newArray[i][1]) > max && !newArray[i][0].includes("L")) {
                    max = newArray[i][1];
                } else {
                    max = max;
                }
        } else {
          max = maxWeight(Number(newArray[i][1]), Number(newArray[i + 1][1]));
        }
      }
      console.log(max + 'ez most a max')
    }
    console.log(max + " ez a max");
  }

  for (let i = 0; i < newArray.length; i++) {
    maxArray.push(newArray[i].join(" "));
  }

};

//pickingMushroom(3, 100, ["L 10", "C 5", "L 6"]);
pickingMushroom(6, 25, ['C 4', 'L 12',  'L 2', 'R 2'])