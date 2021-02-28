export const generateBoard = (width, height) => {
  let matrix = [];
  for (let i = 0; i < height; i++) {
    matrix.push([]);
    for (let j = 0; j < width; j++) {
      const zeroOrOne = Math.floor(Math.random() * 2);
      matrix[i].push(zeroOrOne === 1);
    }
  }
  return generateNumbers(matrix, width, height);
};

export const generateNumbers = (arr, width, height) => {
  const rowCounts = arr.map(lst => {
    let currCount = 0;
    const lstNumbers = [];
    for (let i = 0; i < width; i++) {
      if (lst[i]) {
        currCount++;
      } else {
        if (currCount) {
          lstNumbers.push(currCount);
          currCount = 0;
        }
      }
    }
    if (currCount) {
      lstNumbers.push(currCount);
    }
    return lstNumbers;
  });
  const columnCounts = [];
  for (let i = 0; i < width; i++) {
    let currCount = 0;
    const lstNumbers = [];
    for (let j = 0; j < height; j++) {
      if (arr[j][i]) {
        currCount++;
      } else {
        if (currCount) {
          lstNumbers.push(currCount);
          currCount = 0;
        }
      }
    }
    if (currCount) {
      lstNumbers.push(currCount);
    }
    columnCounts.push(lstNumbers);
  }
  return [rowCounts, columnCounts];
};
