import React, { useState } from "react";
import "./App.css";

const wordleArr = ["flame", "focus", "react"];
const rand = Math.floor(Math.random() * wordleArr.length);
console.log(rand);
const answer = wordleArr[rand];
const answerArr = answer.split("");
console.log(answerArr);
const defaultGuessList = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const keysRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysRow3 = ["Delete", "Z", "X", "C", "V", "B", "N", "M", "Enter"];
const keyBoardArr = [keysRow1, keysRow2, keysRow3];
// const statusObject = {
//   blank: "#333333",
//   incorrect: "gray",
//   wrongSpot: "yellow",
//   correct: "green",
// };

function App() {
  const [wordleGuessList, setWordleGuessList] = useState([...defaultGuessList]);
  const [arrCoords, setArrayCoords] = useState([0, 0]);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Cool">Wordle Copy</h1>
        <div>Answer: {answer}</div>
        <ColumnComponent wordleGuessList={wordleGuessList} />
        <KeyBoardComponent
          wordleGuessList={wordleGuessList}
          setWordleGuessList={setWordleGuessList}
          arrCoords={arrCoords}
          setArrayCoords={setArrayCoords}
        />
      </header>
    </div>
  );
}

const SquareComponent = (props) => {
  return <div className="Wordle-square">{props.square}</div>;
};

const RowComponent = (props) => {
  return (
    <div className="Wordle-row">
      {props.row.map((square, index) => {
        return <SquareComponent key={index} square={square}></SquareComponent>;
      })}
    </div>
  );
};

const ColumnComponent = (props) => {
  return (
    <div className="Wordle-column">
      {props.wordleGuessList.map((row, index) => {
        return <RowComponent key={index} row={row}></RowComponent>;
      })}
    </div>
  );
};

const KeyComponent = (props) => {
  return (
    <div className="Keyboard-key" id={props.letter}>
      {props.letter}
    </div>
  );
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

const KeyBoardComponent = (props) => {
  return (
    <div
      className="Keyboard-grid"
      onClick={
        ("click",
        (e) => {
          const newGuess = e.target.id;
          console.log(newGuess);
          if (newGuess === "") {
            return;
          }
          const updatedWordleGuessList = [...props.wordleGuessList];
          const rowCoord = props.arrCoords[0];
          const indexCoord = handleDelete(newGuess, props.arrCoords[1]);
          const newWordleRow = updatedWordleGuessList[rowCoord];
          if (indexCoord === 5 && newGuess !== "Delete") {
            return;
          }
          newWordleRow[indexCoord] = setKeyValue(newGuess, indexCoord);
          const newIndex = setIndexValue(newGuess, indexCoord);
          const newArrCoords = [...props.arrCoords];
          newArrCoords[1] = newIndex;
          props.setArrayCoords(newArrCoords);
        })
      }
    >
      {keyBoardArr.map((row, index) => {
        return <KeyRowComponent key={index} keyRow={row}></KeyRowComponent>;
      })}
    </div>
  );
};

const setKeyValue = (newGuess, indexCoord) => {
  if (newGuess === "Delete") {
    return "";
  }
  if (newGuess === "Enter") {
    // Do Something
    return;
  }
  if (indexCoord <= 4) {
    return newGuess;
  }
  return;
};

const setIndexValue = (newGuess, indexCoord) => {
  if (indexCoord <= 4 && newGuess === "Delete") {
    return indexCoord;
  }
  if (indexCoord <= 4 && newGuess !== "Delete" && newGuess !== "Enter") {
    return indexCoord + 1;
  }
  return indexCoord;
};

const handleDelete = (newGuess, indexToSet) => {
  if (newGuess === "Delete" && indexToSet > 0 && indexToSet <= 5) {
    return indexToSet - 1;
  }
  return indexToSet;
};

export default App;
