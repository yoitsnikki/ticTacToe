// import the programs needed
import React from 'react';
import './App.css';

// make the square button
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// make the board
class Board extends React.Component {
  constructor(props) {
    super(props);

    // what the state is
    this.state = {
      game: 1,
      squares: Array(9).fill(null),    // array for holding data
      xIsNext: true,
    }
  }

// pulls in test api file
  callAPI() {
    fetch('http://localhost:9000/testAPI')
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log("res", res)
      this.setState({game: res.game, squares: res.squares, xIsNext: res.xIsNext})
    })
    .catch(err => err)
  }

  componentDidMount() {
    this.callAPI();
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  // what happens when the button is clicked
  // slice cuts squares into different array pieces, splice adds them to the main array
  handleClick(i) {
    console.log(i);
    const squares = this.state.squares.slice();
    squares.splice(i, 0);
    console.log(squares);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'x' : 'o';
    this.setState({
      game: 1,
      squares: this.state.squares,
      xIsNext: !this.state.xIsNext,
    });

    console.log("squares", this.state.squares);

    console.log("squares being logged: " + squares);

    fetch('http://localhost:9000/testAPI', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'game': this.state.game,
        'squares': this.state.squares,
        'xIsNext': this.state.xIsNext,
      }),
    })
  }

  render() {
    let winner = false;
    if(this.state.squares){
      winner = calculateWinner(this.state.squares);
    }
    else{
      winner = false
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'x' : 'o');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  console.log(squares)

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

export default App;
