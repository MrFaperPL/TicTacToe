const grid = document.getElementById("grid");
const squareElement = document.querySelectorAll("[data-square]");
const endMessage = document.querySelector("[data-winner-message]");
const showEndScreen = document.getElementById("end-screen");
const restartButton = document.getElementById("restart-button");
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let xTurn;

function startGame() {
    console.log("bruh");
    xTurn = true;
    squareElement.forEach(square => {
        square.classList.remove("x");
        square.classList.remove("o");
        square.removeEventListener("click", handleClick);
        square.addEventListener("click", handleClick, {once: true});
    });
    showEndScreen.classList.remove("show");
}

function setHover() {
    grid.classList.remove("x");
    grid.classList.remove("o");
    if(xTurn) {
        grid.classList.add("o");
    }
    else {
        grid.classList.add("x");
    }
}

function placeSymbol(square, currentTurn) {
    square.classList.add(currentTurn);
}

function checkWin(currentTurn) {
    return winCondition.some(condition => {
        return condition.every(index => {
            return squareElement[index].classList.contains(currentTurn);
        })
    })
}

function isDraw() {
    return [...squareElement].every(square => {
        return square.classList.contains("x") || square.classList.contains("o");
    })
}

function endGame(draw) {
    if(draw) {
        endMessage.innerText = "DRAW!";
    }
    else {
        endMessage.innerText = `${xTurn ? "X" : "O"} WINS!`;
    }
    showEndScreen.classList.add("show");
}

function swapTurn() {
    xTurn = !xTurn;
}

function handleClick(event) {
    const square = event.target;
    const currentTurn = xTurn ? "x" : "o";
    placeSymbol(square, currentTurn);
    if(checkWin(currentTurn)) {
        endGame(false);
    }
    else if(isDraw()) {
        endGame(true);
    }
    else {
        setHover();
        swapTurn();
    }
}

startGame();

restartButton.addEventListener("click", startGame);