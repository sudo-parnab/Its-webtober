let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let turnMessage = document.getElementById("turn-message");
let scoreDisplay = document.getElementById("score");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;
let xScore = 0;
let oScore = 0;

//Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
        element.style.backgroundColor = ""; // reset winning highlight
        element.classList.remove("winner");
    });
    popupRef.classList.add("hide");
    updateTurnMessage();
};

//Update the Turn Message
const updateTurnMessage = () => {
    turnMessage.innerText = xTurn ? "X's Turn" : "O's Turn";
};

//Update Score
const updateScore = (winner) => {
    if (winner === "X") {
        xScore++;
    } else {
        oScore++;
    }
    scoreDisplay.innerText = `X: ${xScore} | O: ${oScore}`;
};

//This function is executed when a player wins
const winFunction = (letter, winPattern) => {
    disableButtons();
    winPattern.forEach((index) => {
        btnRef[index].style.backgroundColor = "#28a745";
        btnRef[index].classList.add("winner");
    });
    updateScore(letter);
    msgRef.innerHTML = `&#x1F389; <br> '${letter}' Wins`;
};

//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//New Game and Restart
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//Win Logic
const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if (element1 != "" && element1 == element2 && element2 == element3) {
            winFunction(element1, i);
            return;
        }
    }
    if (count === 9) drawFunction();
};

//Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            element.innerText = "X";
            element.disabled = true;
            xTurn = false;
        } else {
            element.innerText = "O";
            element.disabled = true;
            xTurn = true;
        }
        updateTurnMessage();
        count++;
        winChecker();
    });
});

//Enable Buttons and disable popup on page load
window.onload = enableButtons;
