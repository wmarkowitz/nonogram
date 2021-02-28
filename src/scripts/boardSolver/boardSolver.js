import { glue, reverseGlue } from "./glue";
import { singleSimpleSpaces } from "./simpleSpaces";
import { fillX, fillO, fillRow } from "./fill";
import { verifyComplete, countXs } from "./verification";
import { arrSum } from "./utility";

export const solveBoard = (
  width,
  height,
  [horizontalNumbers, verticalNumbers],
  updateBoard,
  currentBoard,
  initialize,
  forRow,
  index,
  completeRows,
  completeColumns,
  bound
) => {
  const rowStorage = [];
  const columnStorage = [];
  for (let i = 0; i < height; i++) {
    rowStorage[i] = {};
  }
  for (let i = 0; i < width; i++) {
    columnStorage[i] = {};
  }
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
      fillX(currentBoard, isRow, ind, isRow ? width : height);
      if (isRow) {
        completeRows[ind] = true;
      } else {
        completeColumns[ind] = true;
      }
    }
  };

  if (initialize) {
    for (let i = 0; i < height; i++) {
      initialCheck(currentBoard, true, i, horizontalNumbers[i]);
    }
    for (let i = 0; i < width; i++) {
      initialCheck(currentBoard, false, i, verticalNumbers[i]);
    }
    updateBoard(currentBoard, completeRows, completeColumns);
    return;
  }

  // console.log(currentBoard);

  // ASSORTED TECHNIQUES FOR SOLVING
  // WE WILL ALSO KEEP TRACK OF IF A BOARD IS IMPOSSIBLE FOR RECURSION PURPOSES
  const i = index;
  if (forRow) {
    if (!completeRows[i]) {
      glue(true, i, currentBoard, horizontalNumbers[i], width);
      reverseGlue(true, i, currentBoard, horizontalNumbers[i], width);
      if (horizontalNumbers[i].length === 1) {
        singleSimpleSpaces(true, i, currentBoard, horizontalNumbers[i], width);
      }
      if (currentBoard[i].filter(el => el === "").length <= bound) {
        rowStorage[i] = fillRow(
          currentBoard,
          true,
          i,
          horizontalNumbers[i],
          width,
          rowStorage[i]
        );
      }
      if (verifyComplete(currentBoard, true, i, horizontalNumbers[i], width)) {
        fillX(currentBoard, true, i, width);
        completeRows[i] = true;
      }
      if (countXs(currentBoard, true, i, horizontalNumbers[i], width)) {
        fillO(currentBoard, true, i, width);
        if (
          verifyComplete(currentBoard, true, i, horizontalNumbers[i], width)
        ) {
          completeRows[i] = true;
        } else {
          return -1;
        }
      }
    }
    updateBoard(currentBoard, completeRows, completeColumns);
    return;
  }
  if (!completeColumns[i]) {
    // glue(false, i, currentBoard, verticalNumbers[i], height);
    reverseGlue(false, i, currentBoard, verticalNumbers[i], height);
    if (verticalNumbers[i].length === 1) {
      singleSimpleSpaces(false, i, currentBoard, verticalNumbers[i], height);
    }
    if (
      currentBoard.map(row => row[i]).filter(el => el === "").length <= bound
    ) {
      columnStorage[i] = fillRow(
        currentBoard,
        false,
        i,
        verticalNumbers[i],
        height,
        columnStorage[i]
      );
    }
    if (verifyComplete(currentBoard, false, i, verticalNumbers[i], height)) {
      fillX(currentBoard, false, i, height);
      completeColumns[i] = true;
    }
    if (countXs(currentBoard, false, i, verticalNumbers[i], height)) {
      fillO(currentBoard, false, i, height);
      if (verifyComplete(currentBoard, false, i, verticalNumbers[i], height)) {
        completeColumns[i] = true;
      } else {
        return -1;
      }
    }
  }

  updateBoard(currentBoard, completeRows, completeColumns);
};
