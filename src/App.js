import React, { Component } from "react";
import "./App.css";
import { Flex } from "grid-styled";
import { ThemeProvider } from "styled-components";
import { generateBoard } from "./scripts/boardGenerator";
import BoardRow from "./components/Board/BoardRow";
import HorizontalNumbers from "./components/Board/HorizontalNumbers";
import VerticalNumbers from "./components/Board/VeritcalNumbers";
import { solveBoard } from "./scripts/boardSolver/boardSolver";

const WIDTH = 10;
const HEIGHT = 10;

const theme = {
  highlight: "rgba(0,255,255,.8)"
};

class App extends Component {
  constructor(props) {
    super(props);
    const completeRows = Array(HEIGHT).fill(false);
    const completeColumns = Array(WIDTH).fill(false);
    const hints = generateBoard(WIDTH, HEIGHT);
    let board = [];
    for (let i = 0; i < HEIGHT; i++) {
      board[i] = Array(WIDTH).fill("");
    }
    this.state = {
      topRowHeight: 0,
      hints,
      board,
      initialize: true,
      forRow: true,
      index: -1,
      completeRows,
      completeColumns,
      bound: WIDTH / 2
    };
  }

  updateBoard = (newBoard, completeRows, completeColumns) => {
    let { index, forRow, bound } = this.state;
    do {
      if (forRow) {
        if (index === HEIGHT - 1) {
          index = 0;
          forRow = false;
        } else {
          index++;
        }
      } else {
        if (index === WIDTH - 1) {
          index = 0;
          forRow = true;
          bound += 0.5;
        } else {
          index++;
        }
      }
    } while (
      (forRow && completeRows[index]) ||
      (!forRow && completeColumns[index])
    );
    this.setState({
      board: newBoard,
      forRow,
      index,
      initialize: false,
      completeRows,
      completeColumns,
      bound
    });
  };

  componentDidMount() {
    const topRow = document.getElementById("verticalRow");
    const topRowHeight = topRow.clientHeight;
    this.setState({
      topRowHeight
    });
    // const {
    //   hints,
    //   board,
    //   initialize,
    //   forRow,
    //   index,
    //   completeColumns,
    //   completeRows
    // } = this.state;
    // setInterval(() => {
    //   solveBoard(
    //     WIDTH,
    //     HEIGHT,
    //     hints,
    //     this.updateBoard,
    //     board,
    //     initialize,
    //     forRow,
    //     index,
    //     completeRows,
    //     completeColumns
    //   );
    // }, 500);
  }

  componentDidUpdate() {
    const topRow = document.getElementById("verticalRow");
    const topRowHeight2 = topRow ? topRow.clientHeight : 0;
    if (this.state.topRowHeight !== topRowHeight2) {
      this.setState({ topRowHeight2: topRowHeight2 });
    }
  }

  render() {
    const { hints, board, index, forRow } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Flex flexDirection="row">
            <HorizontalNumbers
              topRowHeight={this.state ? this.state.topRowHeight : 0}
              lst={hints[0]}
              highlightIndex={forRow ? index : -1}
            />
            <Flex flexDirection="column">
              <VerticalNumbers
                lst={hints[1]}
                highlightIndex={forRow ? -1 : index}
              />
              <Flex flexDirection="column">
                {board.map((row, ind) => (
                  <BoardRow
                    key={ind}
                    width={WIDTH}
                    lst={row}
                    highlightRow={forRow && ind === index}
                    highlightBox={!forRow ? index : -1}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
          <button
            onClick={() =>
              setInterval(() => {
                solveBoard(
                  WIDTH,
                  HEIGHT,
                  this.state.hints,
                  this.updateBoard,
                  this.state.board,
                  this.state.initialize,
                  this.state.forRow,
                  this.state.index,
                  this.state.completeRows,
                  this.state.completeColumns,
                  this.state.bound
                );
              }, 500)
            }
          >
            Solve
          </button>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
