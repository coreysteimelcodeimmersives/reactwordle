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
  const [wordleGuessList, setWordleGuessList] = useState([
    JSON.parse(JSON.stringify(defaultGuessList)),
  ]);
  const [arrCoords, setArrayCoords] = useState([0, 0]);

  const handleKeyEvent = (letter) => {
    const newGuess = letter;
    // const updatedWordleGuessList = [...wordleGuessList];
    const updatedWordleGuessList = [
      [...wordleGuessList[0]],
      [...wordleGuessList[1]],
      [...wordleGuessList[2]],
      [...wordleGuessList[3]],
      [...wordleGuessList[4]],
      [...wordleGuessList[5]],
    ];

    const newArrCoords = [...arrCoords];
    console.log("new arr coords", newArrCoords);

    const rowCoord = newArrCoords[0];
    const newWordleRow = updatedWordleGuessList[rowCoord];

    const colCoord = newArrCoords[1];
    const squareIndex = handleDelete(newGuess, colCoord);

    console.log("square index", squareIndex);

    if (squareIndex === 5) {
      return;
    }

    newWordleRow[squareIndex] = setKeyValue(newGuess, squareIndex);
    updatedWordleGuessList[rowCoord] = newWordleRow;
    setWordleGuessList(updatedWordleGuessList);

    newArrCoords[1] = setIndexValue(newGuess, squareIndex);
    setArrayCoords(newArrCoords);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Cool">Wordle Copy</h1>
        <div>Answer: {answer}</div>
        <ColumnComponent wordleGuessList={wordleGuessList} />
        <KeyBoardComponent handleKeyEvent={handleKeyEvent} />
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
        return (
          <SquareComponent
            key={`square-component-${props.rowIndex}-${index}`}
            square={square}
          ></SquareComponent>
        );
      })}
    </div>
  );
};

const ColumnComponent = (props) => {
  return (
    <div className="Wordle-column">
      {props.wordleGuessList.map((row, index) => {
        return (
          <RowComponent
            key={`row-component-${index}`}
            rowIndex={index}
            row={row}
          ></RowComponent>
        );
      })}
    </div>
  );
};

const KeyComponent = ({ letter, handleKeyEvent }) => {
  return (
    <div
      className="Keyboard-key"
      // id={letter}
      onClick={(e) => {
        handleKeyEvent(letter);
      }}
    >
      {letter}
    </div>
  );
};

const KeyRowComponent = ({ keyRow, handleKeyEvent }) => {
  return (
    <div className="Keyboard-row">
      {keyRow.map((letter, index) => {
        return (
          <KeyComponent
            key={letter}
            letter={letter}
            handleKeyEvent={handleKeyEvent}
          ></KeyComponent>
        );
      })}
    </div>
  );
};

const KeyBoardComponent = ({ handleKeyEvent }) => {
  return (
    <div className="Keyboard-grid">
      {keyBoardArr.map((row, index) => {
        return (
          <KeyRowComponent
            key={row}
            keyRow={row}
            handleKeyEvent={handleKeyEvent}
          ></KeyRowComponent>
        );
      })}
    </div>
  );
};

const handleDelete = (newGuess, indexToSet) => {
  if (newGuess === "Delete") {
    return indexToSet - 1;
  }
  return indexToSet;
};

const setKeyValue = (newGuess, squareIndex) => {
  if (squareIndex > 4) {
    return;
  }

  if (newGuess === "Delete") {
    return "";
  }
  if (newGuess === "Enter") {
    // Do Something
    return;
  }
  if (squareIndex <= 4) {
    return newGuess;
  }
  return;
};

const setIndexValue = (newGuess, squareIndex) => {
  if (newGuess === "Enter") {
    return squareIndex;
  }

  if (squareIndex < 0) {
    return 0;
  }

  if (newGuess === "Delete") {
    return squareIndex;
  }
  if (squareIndex <= 4) {
    // return newGuess;
    return squareIndex + 1;
  }
  return;
};

export default App;
