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

  const handleKeyEvent = (e) => {
    const newGuess = e.target.id;
    console.log(newGuess);
    // const updatedWordleGuessList = [...wordleGuessList];
    const updatedWordleGuessList = [
      [...wordleGuessList[0]],
      [...wordleGuessList[1]],
      [...wordleGuessList[2]],
      [...wordleGuessList[3]],
      [...wordleGuessList[4]],
      [...wordleGuessList[5]],
    ];

    const rowCoord = arrCoords[0];
    const colCoord = arrCoords[1];
    const squareIndex = handleDelete(newGuess, colCoord);

    const newWordleRow = updatedWordleGuessList[rowCoord];
    newWordleRow[squareIndex] = setKeyValue(newGuess, squareIndex);

    const newIndex = setIndexValue(newGuess, squareIndex);
    const newArrCoords = [...arrCoords];
    newArrCoords[1] = newIndex;
    setArrayCoords(newArrCoords);
    setWordleGuessList(updatedWordleGuessList);
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
      id={letter}
      onClick={("click", handleKeyEvent)}
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
            key={index}
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
            key={index}
            keyRow={row}
            handleKeyEvent={handleKeyEvent}
          ></KeyRowComponent>
        );
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
  if (newGuess === "Delete") {
    return indexCoord;
  }
  if (newGuess === "Enter") {
    // Do Something
    return;
  }
  if (indexCoord <= 4) {
    // return newGuess;
    return indexCoord + 1;
  }
  // return indexCoord + 1;
  return;
  /* if (indexCoord <= 4 && newGuess === "Delete") {
    return indexCoord;
  }
  if (indexCoord <= 4 && newGuess !== "Delete" && newGuess !== "Enter") {
    return indexCoord + 1;
  }
  return indexCoord; */
};

const handleDelete = (newGuess, indexToSet) => {
  /* if (newGuess === "Delete") {
    return indexCoord;
  }
  if (newGuess === "Enter") {
    // Do Something
    return;
  }
  if (indexCoord <= 4) {
    return newGuess;
  }
  return indexCoord + 1; */
  if (newGuess === "Delete" && indexToSet > 0 && indexToSet <= 5) {
    return indexToSet - 1;
  }
  return indexToSet;
};

export default App;
