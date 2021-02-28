import { arrSum } from "./utility";

export const verifyComplete = function(currentBoard, isRow, ind, lst, length) {
  let count = 0;
  let currInd = 0;
  for (let i = 0; i < length; i++) {
    if (isRow) {
      if (currentBoard[ind][i] === "O") {
        if (currInd >= lst.length) {
          return false;
        }
        count++;
      } else if (count > 0) {
        if (!(count === lst[currInd])) {
          return false;
        }
        currInd++;
        count = 0;
      }
    } else {
      if (currentBoard[i][ind] === "O") {
        if (currInd >= lst.length) {
          return false;
        }
        count++;
      } else if (count > 0) {
        if (!(count === lst[currInd])) {
          return false;
        }
        currInd++;
        count = 0;
      }
    }
  }
  if (count > 0) {
    if (count !== lst[currInd]) {
      return false;
    }
    currInd++;
  }
  if (currInd === lst.length) {
    return true;
  }
  return false;
};

export const countXs = function(currentBoard, isRow, ind, lst, length) {
  let count = arrSum(lst);
  if (isRow) {
    return (
      currentBoard[ind].map(el => {
        if (el === "X") {
          return 1;
        }
        return 0;
      }) === count
    );
  }
  for (let i = 0; i < length; i++) {
    if (currentBoard[i][ind === "X"]) {
      count--;
    }
  }
  if (count === 0) {
    return true;
  }
  return false;
};
