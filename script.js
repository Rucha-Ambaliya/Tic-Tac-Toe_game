let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let heading = document.querySelector("h1");
let modeImg = document.querySelector("#mode-img");
let mode = "dark";
let body = document.querySelector("body");

let turnO = true;
let isWinner = false;
let turn = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

modeImg.addEventListener("click", () => {
    if (mode === "dark") {
        modeImg.src = "images/dark.png";
        body.style.backgroundColor = "#2a9d8f";
        boxes.forEach((box) => {
            box.style.backgroundColor = "#e9c46a";
            box.style.color = "#000";
        });
        resetBtn.style.backgroundColor = "#e76f51";
        resetBtn.style.color = "#000";
        heading.style.color = "#550c18";
        mode = "light";
    } else {
        modeImg.src = "images/light.png";
        body.style.backgroundColor = "#02010a";
        boxes.forEach((box) => {
            box.style.backgroundColor = "#006466";
            box.style.color = "#550c18";
        });
        resetBtn.style.backgroundColor = "#848586";
        resetBtn.style.color = "#0c0f0a";
        heading.style.color = "#d8572a";
        mode = "dark";
    }
});

const resetGame = () => {
    if (isWinner) {
        isWinner = false;
    }
    turn = 0;
    turnO = true;
    enableBoxes();
    resetBtn.innerText = "Reset";
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        turn++;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showDraw = () => {
    msg.innerText = "It was a Draw. Start again.";
    resetBtn.innerText = "New Game";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}.`;
    resetBtn.innerText = "New Game";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val=== pos3Val) {
                showWinner(pos1Val);
                isWinner = true;
                return;
            }
        }
        if (isWinner === false && turn === 9) {
            showDraw();
            return;
        }
    }
};

resetBtn.addEventListener("click", resetGame);
