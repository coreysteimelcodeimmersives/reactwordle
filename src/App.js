import React, { useState } from "react";
import "./App.css";

const wordleArr = ["flame", "focus", "react"];
const rand = Math.floor(Math.random() * wordleArr.length);
console.log(rand);
const answer = wordleArr[rand];
const answerArr = answer.split("");
console.log(answerArr);
const attemptsArr = [[], [], [], [], [], []];
const keysRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysRow3 = ["Delete", "Z", "X", "C", "V", "B", "N", "M", "Enter"];
const keyBoardArr = [keysRow1, keysRow2, keysRow3];
const statusObject = {
  blank: "#333333",
  incorrect: "gray",
  wrongSpot: "yellow",
  correct: "green",
};

function App() {
  const [squareGuess, setSquareGuess] = useState("");
  const [guessStatus, setGuessStatus] = useState(statusObject.blank);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Cool">Wordle Copy</h1>
        <div>Answer: {answer}</div>
        <ColumnComponent
          squareGuess={squareGuess}
          setSquareGuess={setSquareGuess}
          guessStatus={guessStatus}
          setGuessStatus={setGuessStatus}
        />
        <KeyBoardComponent />
      </header>
    </div>
  );
}

const SquareComponent = (props) => {
  return <div className="Wordle-square">{props.squareGuess}</div>;
};

const RowComponent = (props) => {
  return (
    <div className="Wordle-row">
      {answerArr.map((square, index) => {
        return (
          <SquareComponent
            key={index}
            guessStatus={props.guessStatus}
            squareGuess={props.squareGuess}
          ></SquareComponent>
        );
      })}
    </div>
  );
};

const ColumnComponent = (props) => {
  return (
    <div className="Wordle-column">
      {attemptsArr.map((row, index) => {
        return <RowComponent key={index} attempt={row}></RowComponent>;
      })}
    </div>
  );
};

const KeyComponent = (props) => {
  return <div className="Keyboard-key">{props.letter}</div>;
};

const KeyRowComponent = (props) => {
  return (
    <div className="Keyboard-row">
      {props.keyRow.map((letter, index) => {
        return <KeyComponent key={index} letter={letter}></KeyComponent>;
      })}
    </div>
  );
};

const KeyBoardComponent = () => {
  return (
    <div className="Keyboard-grid">
      {keyBoardArr.map((row, index) => {
        return <KeyRowComponent key={index} keyRow={row}></KeyRowComponent>;
      })}
    </div>
  );
};

export default App;
