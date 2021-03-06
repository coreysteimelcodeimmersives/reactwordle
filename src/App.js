import React, { useState, useEffect } from "react";
import "./App.css";
import { answerList, wordList } from "./wordleWords.js";
const defaultGuessList = [
  [
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
  ],
  [
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
  ],
  [
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
  ],
  [
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
  ],
  [
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
  ],
  [
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
    {
      letter: "",
      className: "Wordle-square",
    },
  ],
];

const keysRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keysRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keysRow3 = ["Delete", "z", "x", "c", "v", "b", "n", "m", "Enter"];
const keyBoardArr = [keysRow1, keysRow2, keysRow3];
const allKeys = [...keysRow1, ...keysRow2, ...keysRow3, "Backspace"];

function App() {
  const [wordleGuessList, setWordleGuessList] = useState(
    JSON.parse(JSON.stringify(defaultGuessList))
  );
  const [letterColor, setLetterColor] = useState({});
  const [arrCoords, setArrayCoords] = useState([0, 0]);
  // const [wordleAnswer, setWordleAnswer] = useState(pickWordleAnswer());
  const [wordleAnswer, setWordleAnswer] = useState("karma");
  const [wordleAnswerArr, setWordleAnswerArr] = useState(
    wordleAnswer.split("")
  );
  const [gameState, setGameState] = useState("playing");

  const handleKeyEvent = (letter) => {
    if (gameState !== "playing") {
      return;
    }
    const newGuess = handleNewGuess(letter);

    const arrCoordsCopy = [...arrCoords];

    const wordleGuessListCopy = [
      JSON.parse(JSON.stringify(wordleGuessList[0])),
      JSON.parse(JSON.stringify(wordleGuessList[1])),
      JSON.parse(JSON.stringify(wordleGuessList[2])),
      JSON.parse(JSON.stringify(wordleGuessList[3])),
      JSON.parse(JSON.stringify(wordleGuessList[4])),
      JSON.parse(JSON.stringify(wordleGuessList[5])),
    ];
    const rowCoord = arrCoordsCopy[0];
    const wordleRow = wordleGuessListCopy[rowCoord];
    const colCoord = arrCoordsCopy[1];
    const wordleRowLettersArr = wordleRow.map((key) => {
      return key.letter;
    });

    if (gameState !== "playing") {
      return;
    }

    if (newGuess === "Enter") {
      const validGuess = handleEnter(wordleRowLettersArr, wordleAnswer);

      if (!validGuess) {
        return;
      }

      const newUpdateArrCoords = handleArrCoords(arrCoordsCopy);

      setArrayCoords(newUpdateArrCoords);
      wordleGuessListCopy[rowCoord] = updateSquareClassName(
        wordleRowLettersArr,
        wordleAnswerArr,
        wordleRow
      );
      setWordleGuessList(wordleGuessListCopy);
      const newLetterColor = letterColor;

      const updatedLetterColor = updateKeyboardClassName(
        wordleRowLettersArr,
        wordleAnswerArr,
        newLetterColor
      );

      setLetterColor(updatedLetterColor);

      const newGameState = winOrLose(
        wordleRowLettersArr,
        wordleAnswer,
        rowCoord
      );
      setGameState(newGameState);
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
    return;
  };

  useKeyPress(allKeys, handleKeyEvent, arrCoords);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-link">Wordle Copy</h1>
        <div>Answer: {wordleAnswer}</div>
        <WordleGrid wordleGuessList={wordleGuessList} />
        <WordleKeyboard
          handleKeyEvent={handleKeyEvent}
          letterColor={letterColor}
        />
      </header>
    </div>
  );
}

const SquareComponent = ({ square }) => {
  const newSquare = showCaps(square.letter);
  return <div className={square.className}>{newSquare}</div>;
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

const KeyComponent = ({ letter, handleKeyEvent, letterColor }) => {
  const newLetter = showCaps(letter);
  const letterColorCheck = letterColor[letter]
    ? letterColor[letter]
    : "Keyboard-key";
  return (
    <div
      className={letterColorCheck}
      onClick={(e) => {
        handleKeyEvent(letter);
      }}
    >
      {newLetter}
    </div>
  );
};

const KeyRowComponent = ({ keyRow, handleKeyEvent, letterColor }) => {
  return (
    <div className="Keyboard-row">
      {keyRow.map((letter, index) => {
        return (
          <KeyComponent
            key={letter}
            letter={letter}
            handleKeyEvent={handleKeyEvent}
            letterColor={letterColor}
          ></KeyComponent>
        );
      })}
    </div>
  );
};

const WordleKeyboard = ({ handleKeyEvent, letterColor }) => {
  return (
    <div className="Keyboard-grid">
      {keyBoardArr.map((row, index) => {
        return (
          <KeyRowComponent
            key={row}
            keyRow={row}
            handleKeyEvent={handleKeyEvent}
            letterColor={letterColor}
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

  if (newGuess === "Backspace") {
    const newColCoord = colCoord - 1;
    return newColCoord;
  }

  return colCoord;
};

const updateWordleRow = (newGuess, colCoord, wordleRow) => {
  if (newGuess === "Backspace") {
    wordleRow[colCoord].letter = "";
    return wordleRow;
  }

  wordleRow[colCoord].letter = newGuess;

  return wordleRow;
};

const updateColCoord = (newGuess, colCoord) => {
  if (newGuess === "Backspace") {
    return colCoord;
  }
  return colCoord + 1;
};

const handleEnter = (wordleRowLettersArr, wordleAnswer) => {
  if (!wordleRowLettersArr.includes("")) {
    // alert("Too short");
    return true;
  }
  const userWord = wordleRowLettersArr.join("");

  if (answerList.includes(userWord) || wordList.includes(userWord)) {
    return true;
  }

  if (userWord === wordleAnswer) {
    // alert("Sorry, wrong guess");
    return true;
  }

  return false;
};

const handleArrCoords = (newArrCoords) => {
  const xCoor = newArrCoords[0] + 1;
  return [xCoor, 0];
};

const pickWordleAnswer = () => {
  const rand = Math.floor(Math.random() * answerList.length);

  return answerList[rand];
};

const useKeyPress = (targetKeys, handler, arrCoords) => {
  const upHandler = ({ key }) => {
    const newKey = handleNewGuess(key);
    if (targetKeys.includes(newKey)) {
      handler(newKey);
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
    return "Delete";
  }

  if (letter === "Enter") {
    return letter;
  }

  const newLetter = letter.toUpperCase();

  return newLetter;
};

const handleNewGuess = (letter) => {
  if (letter === "Backspace" || letter === "Delete") {
    return "Backspace";
  }
  if (letter === "Enter") {
    return "Enter";
  }
  return letter.toLowerCase();
};

const updateSquareClassName = (
  wordleRowLettersArr,
  wordleAnswerArr,
  wordleRow
) => {
  console.log(wordleRowLettersArr);
  return calculateGuessResult(
    wordleRow,
    wordleAnswerArr.join("").toLowerCase()
  );
};

export const calculateGuessResult = (currentGuessArray, wordleAnswer) => {
  const guessLetterCount = {};
  const answerLetterCount = {};
  const currentGuessArrayCopy = JSON.parse(JSON.stringify(currentGuessArray));

  //GreyCount Loop
  for (let i = 0; i < currentGuessArray.length; i++) {
    currentGuessArrayCopy[i] = {
      ...currentGuessArrayCopy[i],
      className: "Wordle-square grey",
    };

    const wordleAnswerLower = wordleAnswer[i].toLowerCase();
    if (!answerLetterCount.hasOwnProperty(wordleAnswerLower)) {
      answerLetterCount[wordleAnswerLower] = 1;
    } else {
      answerLetterCount[wordleAnswerLower]++;
    }
  }

  //GreenYellow Loop
  for (let i = 0; i < currentGuessArray.length; i++) {
    const letterLower = currentGuessArray[i].letter.toLowerCase();
    if (!guessLetterCount.hasOwnProperty(letterLower)) {
      guessLetterCount[letterLower] = 1;
    }

    if (wordleAnswer[i] === letterLower) {
      currentGuessArrayCopy[i] = {
        ...currentGuessArrayCopy[i],
        className: "Wordle-square green",
      };
      guessLetterCount[letterLower]--;
    }

    if (
      answerLetterCount.hasOwnProperty(letterLower) &&
      guessLetterCount[letterLower] > 0
    ) {
      currentGuessArrayCopy[i] = {
        ...currentGuessArrayCopy[i],
        className: "Wordle-square orange",
      };
      guessLetterCount[letterLower]--;
    }
  }
  return currentGuessArrayCopy;

  //GreyCount Loop
  //Flag Grey
  //If ! global answer counter hasOwnProperty(answer[i])
  //Add answer[i] to global answer counter
  //Else increment answer[i] in global answer counter

  //GreenYellow Loop
  //If ! global letter counter hasOwnProperty(letter)
  //Add letter to global letter counter

  //If letter === wordleAnswer @ index
  //Flag Green
  //Decrement global letter counter

  //If global answer counter hasOwnProperty(letter)
  //&& global counter [letter] > 0
  //Flag Yellow
  //Decrement global letter counter
};

const updateKeyboardClassName = (
  wordleRowLettersArr,
  wordleAnswerArr,
  newLetterColor
) => {
  wordleRowLettersArr.map((square, index) => {
    if (!wordleAnswerArr.includes(square)) {
      newLetterColor[square] = "Keyboard-key grey";
    }
    if (
      wordleAnswerArr.includes(square) &&
      newLetterColor[square] !== "Keyboard-key green"
    ) {
      newLetterColor[square] = "Keyboard-key orange";
    }
    if (square === wordleAnswerArr[index]) {
      newLetterColor[square] = "Keyboard-key green";
    }
  });

  return newLetterColor;
};

const winOrLose = (wordleRowLettersArr, wordleAnswer, rowCoord) => {
  const userAns = wordleRowLettersArr.join("");

  if (userAns === wordleAnswer) {
    alert("Congrats, you won!");

    return "won";
  }
  if (rowCoord === 5) {
    // alert("Sorry, you lost.");
    // alert("The Wordle Word is: " + wordleAnswer.toUpperCase());

    return "lost";
  }

  return "playing";
};

export default App;
