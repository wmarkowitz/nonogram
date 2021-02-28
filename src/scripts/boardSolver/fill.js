import { verifyComplete } from "./verification";

//Fills empty spaces with X's, to be used when completing a row or column
export const fillX = function(currentBoard, isRow, ind, length) {
  for (let i = 0; i < length; i++) {
    if (isRow) {
      if (currentBoard[ind][i] === "") {
        currentBoard[ind][i] = "X";
      }
    } else {
      if (currentBoard[i][ind] === "") {
        currentBoard[i][ind] = "X";
      }
    }
  }
};

//Fills empty spaces with O's, similarly to fillX
export const fillO = function(currentBoard, isRow, ind, length) {
  for (let i = 0; i < length; i++) {
    if (isRow) {
      if (currentBoard[ind][i] === "") {
        currentBoard[ind][i] = "O";
      }
    } else {
      if (currentBoard[i][ind] === "") {
        currentBoard[i][ind] = "O";
      }
    }
  }
};

export const fillRow = function(
  currentBoard,
  isRow,
  ind,
  lst,
  length,
  initialStorage
) {
  const base = isRow ? currentBoard[ind] : currentBoard.map(row => row[ind]);
  const storage = initialStorage;
  const f = function(row) {
    if (storage[row]) {
      return storage[row];
    }
    if (row.findIndex(el => el === "") === -1) {
      storage[row] = verifyComplete([row], true, 0, lst, length);
      return storage[row];
    }
    let toReturn = false;
    for (let i = 0; i < length; i++) {
      if (row[i] === "") {
        const temp = row.map(el => el);
        temp[i] = "O";
        const useO = f(temp);
        if (useO) {
          storage[row] = true;
        }
        temp[i] = "X";
        const useX = f(temp);
        if (useX) {
          storage[row] = true;
        }
        if (useO || useX) {
          toReturn = true;
        }
      }
    }
    if (!toReturn) {
      storage[row] = false;
    }
    return toReturn;
  };
  f(base);
  for (let i = 0; i < length; i++) {
    if (base[i] === "") {
      const temp = base.map(el => el);
      temp[i] = "O";
      const canBeO = storage[temp];
      temp[i] = "X";
      const canBeX = storage[temp];
      if (!(canBeO || canBeX)) {
        return -1;
      } else if (!canBeO) {
        base[i] = "X";
      } else if (!canBeX) {
        base[i] = "O";
      }
    }
  }

  for (let i = 0; i < length; i++) {
    if (isRow) {
      currentBoard[ind][i] = base[i];
    } else {
      currentBoard[i][ind] = base[i];
    }
  }
  return storage;
};

//fillRow(x,true,0,[3,3],7)
