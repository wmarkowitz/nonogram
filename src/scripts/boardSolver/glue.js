export const glue = function(isRow, ind, currentBoard, lst, length) {
  let prevBorder = 0;
  let currHint = 0;
  let atCurrHint = lst[currHint];
  for (let i = 0; i < length; i++) {
    if (prevBorder > atCurrHint) {
      break;
    }
    if (isRow) {
      if (currentBoard[ind][i] === "O") {
        for (let j = 1; j < atCurrHint - prevBorder; j++) {
          if (currentBoard[ind][i + j] === "X") {
            return -1;
          }
          currentBoard[ind][i + j] = "O";
        }
        if (prevBorder === 0) {
          if (currentBoard[ind][i + atCurrHint] === "O") {
            return -1;
          }
          currentBoard[ind][i + atCurrHint] = "X";
          i += atCurrHint;
          prevBorder = -1;
          currHint++;
          if (currHint < lst.length) {
            atCurrHint = lst[currHint];
          }
        } else {
          break;
        }
      } else if (currentBoard[ind][i] === "X") {
        prevBorder--;
      }
    } else {
      if (currentBoard[i][ind] === "O") {
        for (let j = 1; j < atCurrHint - prevBorder; j++) {
          if (currentBoard[i + j][ind] === "X") {
            return -1;
          }
          currentBoard[i + j][ind] = "O";
        }
        if (prevBorder === 0) {
          if (currentBoard[i + atCurrHint][ind] === "O") {
            return -1;
          }
          currentBoard[i + atCurrHint][ind] = "X";
          i += atCurrHint;
          prevBorder = -1;
          currHint++;
          if (currHint < lst.length) {
            atCurrHint = lst[currHint];
          }
        } else {
          break;
        }
      } else if (currentBoard[i][ind] === "X") {
        prevBorder--;
      }
    }
    prevBorder++;
  }
};

export const reverseGlue = function(isRow, ind, currentBoard, lst, length) {
  let prevBorder = 0;
  let currHint = lst.length - 1;
  let atCurrHint = lst[currHint];
  for (let i = length - 1; i > 0; i--) {
    if (prevBorder > atCurrHint) {
      break;
    }
    if (isRow) {
      if (currentBoard[ind][i] === "O") {
        for (let j = 1; j < atCurrHint - prevBorder; j++) {
          if (currentBoard[ind][i - j] === "X") {
            return -1;
          }
          currentBoard[ind][i - j] = "O";
        }
        if (prevBorder === 0) {
          if (currentBoard[ind][i - atCurrHint] === "O") {
            return -1;
          }
          currentBoard[ind][i - atCurrHint] = "X";
          i -= atCurrHint;
          prevBorder = -1;
          if (currHint > 0) {
            currHint--;
          }
          atCurrHint = lst[currHint];
        } else {
          break;
        }
      } else if (currentBoard[ind][i] === "X") {
        prevBorder--;
      }
    } else {
      if (currentBoard[i][ind] === "O") {
        for (let j = 1; j < atCurrHint - prevBorder; j++) {
          if (currentBoard[i - j][ind] === "X") {
            return -1;
          }
          currentBoard[i - j][ind] = "O";
        }
        if (prevBorder === 0) {
          if (currentBoard[i - atCurrHint][ind] === "O") {
            return -1;
          }
          currentBoard[i - atCurrHint][ind] = "X";
          i -= atCurrHint;
          prevBorder = -1;
          currHint--;
          if (currHint > 0) {
            atCurrHint = lst[currHint];
          }
        } else {
          break;
        }
      } else if (currentBoard[i][ind] === "X") {
        prevBorder--;
      }
    }
    prevBorder++;
  }
};
