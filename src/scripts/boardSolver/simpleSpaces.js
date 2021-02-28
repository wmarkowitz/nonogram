export const singleSimpleSpaces = function(
  isRow,
  ind,
  currentBoard,
  lst,
  length
) {
  let leftBorder = -1;
  let rightBorder = length;
  let minCheck = -1;
  let maxCheck = -1;
  for (let i = 0; i < length; i++) {
    if (isRow) {
      if (currentBoard[ind][i] === "X") {
        if (minCheck === -1) {
          leftBorder = i;
        } else if (rightBorder === length) {
          rightBorder = i;
        }
      }
      if (currentBoard[ind][i] === "O") {
        if (minCheck === -1) {
          minCheck = i;
        }
        maxCheck = i;
      }
    } else {
      if (currentBoard[i][ind] === "X") {
        if (minCheck === -1) {
          leftBorder = i;
        } else if (rightBorder === length) {
          rightBorder = i;
        }
      }
      if (currentBoard[i][ind] === "O") {
        if (minCheck === -1) {
          minCheck = i;
        }
        maxCheck = i;
      }
    }
  }
  if (minCheck === -1) {
    return;
  }
  for (let i = minCheck + 1; i < maxCheck; i++) {
    if (isRow) {
      if (currentBoard[ind][i] === "X") {
        return -1;
      }
      currentBoard[ind][i] = "O";
    } else {
      if (currentBoard[i][ind] === "X") {
        return -1;
      }
      currentBoard[i][ind] = "O";
    }
  }
  for (let i = 0; i < leftBorder; i++) {
    if (isRow) {
      if (currentBoard[ind][i] === "O") {
        return -1;
      }
      currentBoard[ind][i] = "X";
    } else {
      if (currentBoard[i][ind] === "O") {
        return -1;
      }
      currentBoard[i][ind] = "X";
    }
  }
  for (let i = rightBorder; i < length; i++) {
    if (isRow) {
      if (currentBoard[ind][i] === "O") {
        return -1;
      }
      currentBoard[ind][i] = "X";
    } else {
      if (currentBoard[i][ind] === "O") {
        return -1;
      }
      currentBoard[i][ind] = "X";
    }
  }
};
