import { glue, reverseGlue } from "./glue";

export const solveBoard = (
  width,
  height,
  [horizontalNumbers, verticalNumbers]
) => {
  const completeRows = Array(height).fill(false);
  const completeColumns = Array(width).fill(false);

  //Fills empty spaces with X's, to be used when completing a row or column
  let fillX = function(currentBoard, isRow, ind) {
    const length = isRow ? width : height;
    for (let i = 0; i < length; i++) {
      if (isRow) {
        if (currentBoard[ind][i] === "_") {
          currentBoard[ind][i] = "X";
        }
      } else {
        if (currentBoard[i][ind] === "_") {
          currentBoard[i][ind] = "X";
        }
      }
    }
  };

  //Initializes a row/column using the mathematical approach (see https://en.wikipedia.org/wiki/Nonogram)
  let initialCheck = function(currentBoard, isRow, ind, lst) {
    const length = isRow ? width : height;
    const bound = length - lst.reduce((acc, cur) => acc + cur + 1, -1);
    for (let i = 0; i < length; i++) {
      if (lst[i] > bound) {
        const buffer = arrSum(lst.slice(0, i)) + bound + i;
        for (let j = 0; j < lst[i] - bound; j++) {
          if (isRow) {
            currentBoard[ind][buffer + j] = "O";
          } else {
            currentBoard[buffer + j][ind] = "O";
          }
        }
      }
    }
    if (bound === 0) {
      fillX(currentBoard, isRow, ind);
      if (isRow) {
        completeRows[ind] = true;
      } else {
        completeColumns[ind] = true;
      }
    }
  };
  const arrSum = arr => arr.reduce((a, b) => a + b, 0);
  const board = [];
  for (let i = 0; i < height; i++) {
    board.push(Array(width).fill("_"));
  }

  for (let i = 0; i < height; i++) {
    initialCheck(board, true, i, horizontalNumbers[i]);
  }
  for (let i = 0; i < width; i++) {
    initialCheck(board, false, i, verticalNumbers[i]);
  }

  // console.log(board);

  // ASSORTED TECHNIQUES FOR SOLVING
  // WE WILL ALSO KEEP TRACK OF IF A BOARD IS IMPOSSIBLE FOR RECURSION PURPOSES

  for (let i = 0; i < height; i++) {
    if (!completeRows[i]) {
      glue(true, i, board, horizontalNumbers[i], width);
      reverseGlue(true, i, board, horizontalNumbers[i], width);
    }
  }
  for (let i = 0; i < width; i++) {
    if (!completeColumns[i]) {
      glue(false, i, board, verticalNumbers[i], height);
      reverseGlue(false, i, board, verticalNumbers[i], height);
    }
  }

  return board;
};
