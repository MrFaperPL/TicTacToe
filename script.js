// Main variables needed to run the game

const grid = document.getElementById("grid");
const squareElement = document.querySelectorAll("[data-square]");
const endMessage = document.querySelector("[data-winner-message]");
const showEndScreen = document.getElementById("end-screen");
const restartButton = document.getElementById("restart-button");
const mainContainer = document.querySelector("[data-main-container]");
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

// Variables needed for counting players scores

const namePlayer1 = document.getElementById("player1");
const namePlayer2 = document.getElementById("player2");
const documentScorePlayer1 = document.getElementById("score-player1");
const documentScorePlayer2 = document.getElementById("score-player2");
let scorePlayer1 = 0;
let scorePlayer2 = 0;

// Main game logic

function startGame() {
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
        if(xTurn) {
            endMessage.innerText = "X WINS!";
            documentScorePlayer1.innerText = ++scorePlayer1;
        }
        else {
            endMessage.innerText = "O WINS!";
            documentScorePlayer2.innerText = ++scorePlayer2;
        }
        xTurn ? xTurn = true : setHover();
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

// Dark theme logic

const darkModeToggle = document.getElementById("dark-mode-toggle");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
let isDarkTheme = false;

function swapDarkTheme() {
    isDarkTheme = !isDarkTheme;
}

function toggleDarkTheme() {
    if(isDarkTheme) {
        mainContainer.classList.remove("invert-color");
        sun.classList.remove("invisible");
        moon.classList.add("invisible");
    }
    else {
        mainContainer.classList.add("invert-color");
        sun.classList.add("invisible");
        moon.classList.remove("invisible");
    }
    swapDarkTheme();
}

darkModeToggle.addEventListener("change", toggleDarkTheme)

/*

// This is JS part of the idea to add animation while dark mode is changing
// Might think of it later

// Note: The animation works only half way while changing light theme to dark theme but not the other way

darkModeToggle.onchange = function(){
    if(isDarkTheme) {
        mainContainer.classList.toggle("fade-out");
        setTimeout(() => {
            mainContainer.classList.remove("fade-out");
        }, 500);
    }
    else {
        mainContainer.classList.toggle("fade-in");
        setTimeout(() => {
            mainContainer.classList.remove("fade-in");
        }, 500);
    }
}

*/