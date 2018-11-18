import React, { Component } from 'react';
import _ from 'lodash';
import './Game.css'

function Square(props) {
    return (
        <button onClick={props.onClick} className="square">
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (<Square value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }
    render() {
        let i = 0;
        return _.times(3,() => {
            return(
                <div className="board-row">
                    {_.times(3, () => {
                        return this.renderSquare(i++)
                    })}
                </div>
            )    
         })
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    render() {
        //shouldn't set state inside render method
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}`:
            'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = `Winner ${winner}`;
        } else {
            status = `Next player: X ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{moves}</ol>
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
    let winner = null;
    lines.forEach((line) => {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winner =  squares[a];
        }
    });
    return winner;
}

// ========================================

export default Game;

