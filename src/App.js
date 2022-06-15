import React, { useState } from "react";
import "./App.css";
import { answerList, wordList } from "./wordleWords.js";

const wordleArr = answerList;
const rand = Math.floor(Math.random() * wordleArr.length);
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
  const [wordleGuessList, setWordleGuessList] = useState(
    JSON.parse(JSON.stringify(defaultGuessList))
  );
  const [arrCoords, setArrayCoords] = useState([0, 0]);

  const handleKeyEvent = (letter) => {
    const newGuess = letter;

    const newArrCoords = [...arrCoords];

    const updatedWordleGuessList = [
      [...wordleGuessList[0]],
      [...wordleGuessList[1]],
      [...wordleGuessList[2]],
      [...wordleGuessList[3]],
      [...wordleGuessList[4]],
      [...wordleGuessList[5]],
    ];

    const rowCoord = newArrCoords[0];
    const newWordleRow = updatedWordleGuessList[rowCoord];
    const colCoord = newArrCoords[1];

    if (newGuess === "Enter") {
      const updateArrCoords = handleEnter(newWordleRow, newArrCoords);
      setArrayCoords(updateArrCoords);
    }

    const squareIndex = handleDelete(newGuess, colCoord);
    if (squareIndex === 5) {
      return;
    }
    newWordleRow[squareIndex] = setKeyValue(newGuess, squareIndex);
    updatedWordleGuessList[rowCoord] = newWordleRow;
    setWordleGuessList(updatedWordleGuessList);
    newArrCoords[1] = setSquareIndexValue(newGuess, squareIndex);
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

const SquareComponent = ({ square }) => {
  return <div className="Wordle-square">{square}</div>;
};

const RowComponent = ({ rowIndex, row }) => {
  return (
    <div className="Wordle-row">
      {row.map((square, index) => {
        return (
          <SquareComponent
            key={`square-component-${rowIndex}-${index}`}
            square={square}
          ></SquareComponent>
        );
      })}
    </div>
  );
};

const ColumnComponent = ({ wordleGuessList }) => {
  return (
    <div className="Wordle-column">
      {wordleGuessList.map((row, index) => {
        return (
          <RowComponent
            key={`row-component-${row}-${index}`}
            rowIndex={row}
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

const setSquareIndexValue = (newGuess, squareIndex) => {
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

const handleEnter = (newWordleRow, newArrCoords) => {
  if (newWordleRow.includes("")) {
    alert("Too short");
    return newArrCoords;
  }
  const userWord = newWordleRow.join("").toLowerCase();

  if (userWord === answer) {
    alert("Congrats, you won!");
    return newArrCoords;
  }

  if (!answerList.includes(userWord) && !wordList.includes(userWord)) {
    alert("Word not found");
    return newArrCoords;
  }

  const xCoor = newArrCoords[0] + 1;
  return [xCoor, 0];
};

export default App;
