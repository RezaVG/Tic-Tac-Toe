const GameBoard = (() => {
  const cells = document.querySelectorAll("[data-cell]");
  const X_CLASS = "x";
  const CIRCLE_CLASS = "circle";
  let circleturn;
  const board = document.getElementById("board");
  const winningMessageElement = document.getElementById("winningMessage");
  const winningMessageTextElement = document.querySelector(
    "[data-winnig-message-text]"
  );
  const restartButton = document.getElementById("restartButton");
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  restartButton.addEventListener("click", startGame);
  startGame();

  function startGame() {
    cells.forEach(cell => {
      cell.addEventListener("click", handleClick, { once: true });
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
    });
    circleturn = false;
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
  }

  function handleClick(e) {
    //place the mark
    const cell = e.target;
    const currentClass = circleturn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    //check for win
    if (checkWinner(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }

  function isDraw() {
    return [...cells].every(cell => {
      return (
        cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
      );
    });
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    circleturn = !circleturn;
  }

  function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    circleturn
      ? board.classList.add(CIRCLE_CLASS)
      : board.classList.add(X_CLASS);
  }

  function checkWinner(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass);
      });
    });
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.textContent = "It's a Draw!";
    } else {
      winningMessageTextElement.textContent = `${
        circleturn ? "O's" : "X's"
      } Wins!`;
    }
    winningMessageElement.classList.add("show");
  }
  return { board };
})();

const creatPlayer = name => {
  return { name };
};
