export const glue = function(isRow, ind, currentBoard, lst, length) {
  let prevBorder = 0;
  let currHint = 0;
  let atCurrHint = lst[currHint];
  for (let i = 0; i < length; i++) {
    if (prevBorder >= atCurrHint) {
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
          if (i + atCurrHint < length) {
            currentBoard[ind][i + atCurrHint] = "X";
          }
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
        for (let j = 0; j < prevBorder; j++) {
          currentBoard[ind][i - j] = "X";
        }
        prevBorder = -1;
      }
    } else {
      if (currentBoard[i][ind] === "O") {
        for (let j = 1; j < atCurrHint - prevBorder; j++) {
          if (currentBoard[i + j][ind] === "X") {
            return -1;
          }
          currentBoard[i + j][ind] = "O";
        }
        if (i >= length - atCurrHint) {
          break;
        }
        if (prevBorder === 0) {
          if (currentBoard[i + atCurrHint][ind] === "O") {
            return -1;
          }
          if (i + atCurrHint < length) {
            currentBoard[i + atCurrHint][ind] = "X";
          }
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
        for (let j = 0; j < prevBorder; j++) {
          currentBoard[i - j][ind] = "X";
        }
        prevBorder = -1;
      }
    }
    prevBorder++;
  }
};

export const reverseGlue = function(isRow, ind, currentBoard, lst, length) {
  let prevBorder = 0;
  let currHint = lst.length - 1;
  let atCurrHint = lst[currHint];
  for (let i = length - 1; i >= 0; i--) {
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
          if (currHint >= 0) {
            currHint--;
          }
          atCurrHint = lst[currHint];
        } else {
          break;
        }
      } else if (currentBoard[ind][i] === "X") {
        for (let j = 0; j < prevBorder; j++) {
          currentBoard[ind][i + j] = "X";
        }
        prevBorder = -1;
      }
    } else {
      if (currentBoard[i][ind] === "O") {
        for (let j = 1; j < atCurrHint - prevBorder; j++) {
          if (currentBoard[i - j][ind] === "X") {
            return -1;
          }
          currentBoard[i - j][ind] = "O";
        }
        if (i <= atCurrHint) {
          break;
        }
        if (prevBorder === 0) {
          if (currentBoard[i - atCurrHint][ind] === "O") {
            return -1;
          }
          currentBoard[i - atCurrHint][ind] = "X";
          i -= atCurrHint;
          prevBorder = -1;
          currHint--;
          if (currHint >= 0) {
            atCurrHint = lst[currHint];
          } else {
            break;
          }
        } else {
          break;
        }
      } else if (currentBoard[i][ind] === "X") {
        for (let j = 0; j < prevBorder; j++) {
          currentBoard[i + j][ind] = "X";
        }
        prevBorder = -1;
      }
    }
    prevBorder++;
  }
};
