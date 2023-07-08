let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const boxes = document.getElementsByClassName("matrix-box");
const resetButton = document.getElementById("reset-button");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalCloseButton = document.getElementById("modal-close");
const overlay = document.getElementById("overlay");

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    handleClick(i);
  });
}

resetButton.addEventListener("click", resetGame);
modalCloseButton.addEventListener("click", hideModal);

function handleClick(boxIndex) {
  if (gameState[boxIndex] !== "" || !gameActive) {
    return;
  }

  gameState[boxIndex] = currentPlayer;
  boxes[boxIndex].textContent = currentPlayer;
  boxes[boxIndex].classList.add(`player-${currentPlayer.toLowerCase()}`);

  if (checkWin(currentPlayer)) {
    announceWinner(currentPlayer);
    gameActive = false;
    return;
  }

  if (isTie()) {
    announceTie();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin(player) {
  return winningCombos.some((combo) => {
    return combo.every((index) => {
      return gameState[index] === player;
    });
  });
}

function isTie() {
  return gameState.every((value) => value !== "");
}

function announceWinner(player) {
  modalMessage.textContent = `Player ${player} wins!`;
  showModal();
}

function announceTie() {
  modalMessage.textContent = "It's a tie!";
  showModal();
}

function showModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
    boxes[i].classList.remove("player-x", "player-o");
  }
}

hideModal();
