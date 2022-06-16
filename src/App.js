import React, { useState, useEffect } from "react";
import "./App.css";
import { answerList, wordList } from "./wordleWords.js";
const defaultGuessList = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const keysRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keysRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keysRow3 = ["Delete", "z", "x", "c", "v", "b", "n", "m", "Enter"];
const keyBoardArr = [keysRow1, keysRow2, keysRow3];
const allKeys = [...keysRow1, ...keysRow2, ...keysRow3, "Backspace"];
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
  const [wordleAnswer, setWordleAnswer] = useState(pickWordleAnswer());
  const [wordleAnswerArr, setWordleAnswerArr] = useState(
    wordleAnswer.split("")
  );
  const [gameState, setGameState] = useState("playing");

  const handleKeyEvent = (letter) => {
    const newGuess = showDelete(letter);

    const arrCoordsCopy = [...arrCoords];

    const wordleGuessListCopy = [
      [...wordleGuessList[0]],
      [...wordleGuessList[1]],
      [...wordleGuessList[2]],
      [...wordleGuessList[3]],
      [...wordleGuessList[4]],
      [...wordleGuessList[5]],
    ];

    const rowCoord = arrCoordsCopy[0];
    const wordleRow = wordleGuessListCopy[rowCoord];
    const colCoord = arrCoordsCopy[1];

    if (newGuess === "Enter") {
      const newUpdateArrCoords = handleEnter(
        wordleRow,
        arrCoordsCopy,
        wordleAnswer
      );
      setArrayCoords(newUpdateArrCoords);
      return;
    }

    const newColCoord = setIndexForDelete(newGuess, colCoord);

    if (newColCoord === 5) {
      return;
    }

    wordleGuessListCopy[rowCoord] = updateWordleRow(
      newGuess,
      newColCoord,
      wordleRow
    );

    setWordleGuessList(wordleGuessListCopy);
    arrCoordsCopy[1] = updateColCoord(newGuess, newColCoord);
    setArrayCoords(arrCoordsCopy);
    console.log(arrCoordsCopy);
    return;
  };

  useKeyPress(allKeys, handleKeyEvent, arrCoords);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Cool">Wordle Copy</h1>
        <div>Answer: {wordleAnswer}</div>
        <WordleGrid wordleGuessList={wordleGuessList} />
        <WordleKeyboard handleKeyEvent={handleKeyEvent} />
      </header>
    </div>
  );
}

const SquareComponent = ({ square }) => {
  const newSquare = showCaps(square);
  return <div className="Wordle-square">{newSquare}</div>;
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

const WordleGrid = ({ wordleGuessList }) => {
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
  const newLetter = showCaps(letter);

  return (
    <div
      className="Keyboard-key"
      // id={letter}
      onClick={(e) => {
        handleKeyEvent(letter);
      }}
    >
      {newLetter}
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

const WordleKeyboard = ({ handleKeyEvent }) => {
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

const setIndexForDelete = (newGuess, colCoord) => {
  if (colCoord === 0) {
    return colCoord;
  }

  if (newGuess === "Delete") {
    const newColCoord = colCoord - 1;
    return newColCoord;
  }

  return colCoord;
};

const updateWordleRow = (newGuess, colCoord, wordleRow) => {
  if (newGuess === "Delete") {
    wordleRow[colCoord] = "";
    return wordleRow;
  }
  wordleRow[colCoord] = newGuess;
  return wordleRow;
};

const updateColCoord = (newGuess, colCoord) => {
  if (newGuess === "Delete") {
    return colCoord;
  }
  return colCoord + 1;
};

const handleEnter = (newWordleRow, newArrCoords, wordleAnswer) => {
  if (newWordleRow.includes("")) {
    alert("Too short");
    return newArrCoords;
  }
  const userWord = newWordleRow.join("").toLowerCase();

  if (userWord === wordleAnswer) {
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

const pickWordleAnswer = () => {
  const rand = Math.floor(Math.random() * answerList.length);

  return answerList[rand];
};

const useKeyPress = (targetKeys, handler, arrCoords) => {
  const upHandler = ({ key }) => {
    console.log(key);

    if (targetKeys.includes(key)) {
      handler(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keyup", upHandler);
    };
  }, [arrCoords]);
};

const showCaps = (letter) => {
  if (letter === "Delete") {
    return letter;
  }
  if (letter === "Enter") {
    return letter;
  }

  const newLetter = letter.toUpperCase();

  return newLetter;
};

const showDelete = (letter) => {
  if (letter === "Backspace") {
    return "Delete";
  }
  return letter;
};

export default App;
