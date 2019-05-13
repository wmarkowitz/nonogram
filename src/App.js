import React, { Component } from "react";
import "./App.css";
import { Box, Flex } from "grid-styled";
import { generateBoard } from "./scripts/boardGenerator";
import BoardRow from "./components/Board/BoardRow";
import HorizontalNumbers from "./components/Board/HorizontalNumbers";
import VerticalNumbers from "./components/Board/VeritcalNumbers";
import { solveBoard } from "./scripts/boardSolver/boardSolver";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { topRowHeight: 0, board: generateBoard(10, 10) };
  }

  componentDidMount() {
    const topRow = document.getElementById("verticalRow");
    const topRowHeight = topRow.clientHeight;
    this.setState({
      topRowHeight
    });
  }

  componentDidUpdate() {
    const topRow = document.getElementById("verticalRow");
    const topRowHeight2 = topRow ? topRow.clientHeight : 0;
    if (this.state.topRowHeight !== topRowHeight2) {
      this.setState({ topRowHeight2: topRowHeight2 });
    }
  }

  render() {
    const { board } = this.state;
    board && console.log(solveBoard(10, 10, board));
    return (
      <div className="App">
        <Box>{JSON.stringify(board[0])}</Box>
        <Box>{JSON.stringify(board[1])}</Box>
        <Flex flexDirection="row">
          <HorizontalNumbers
            topRowHeight={this.state ? this.state.topRowHeight : 0}
            lst={board[0]}
          />
          <Flex flexDirection="column">
            <VerticalNumbers lst={board[1]} />
            <Flex flexDirection="column">
              {Array.from(Array(10).keys()).map(el => (
                <BoardRow key={el} width={10} lst={board[0][el]} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </div>
    );
  }
}

export default App;
