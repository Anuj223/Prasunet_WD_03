let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let toggBtn = document.querySelector(".toggle-mode");

let startBtn = document.querySelector(".start-btn");
let playerOInput = document.querySelector("#playerO");
let playerXInput = document.querySelector("#playerX");

let playerOName = "Player O";
let playerXName = "Player X";
let turnO = true; //player-X && Player-O
let count =0;
let isAiMode=false;

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

      const resetGame = () => {
        turnO = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
      };
      const aiMove = () => {
        let availableBoxes = [];
        boxes.forEach((box, index) => {
            if (box.innerText === "") {
                availableBoxes.push(index);
            }
        });
    
        if (availableBoxes.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableBoxes.length);
            let boxToClick = boxes[availableBoxes[randomIndex]];
            boxToClick.click();
        }
    };
      boxes.forEach((box) => {
        box.addEventListener("click", () => {
          if (turnO) {
            //playerO
            box.innerText = "O";
            turnO = false;
          } else {
            //playerX
            box.innerText = "X";
            turnO = true;
          }
          box.disabled = true;
          count++;
      
          let isWinner = checkWinner();
      
          if (count === 9 && !isWinner) {
            gameDraw();
          }
          if (isAiMode && !turnO) {
            setTimeout(aiMove, 500);
        }
        });
      });
      
      const gameDraw = () => {
        msg.innerText = `Game was a Draw.`;
        msgContainer.classList.remove("hide");
        disableBoxes();
      };
      
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
      
      const showWinner = (winner) => {
        
        let winnerName;
        if(!isAiMode){
          winnerName = winner === "O" ? playerOName : playerXName;
        }else{
          winnerName = winner === "O" ? playerOName : "AI";
        }

        msg.innerText = `Congratulations, Winner is ${winnerName}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
      };
      
      const checkWinner = () => {
        for (let pattern of winPatterns) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;
      
          if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
              showWinner(pos1Val);
              return true;
            }
          }
        }
      };
      
      newGameBtn.addEventListener("click", resetGame);
      resetBtn.addEventListener("click", resetGame);

      toggBtn.addEventListener("click", () => {
        isAiMode = !isAiMode;
        playerXInput.style.display = isAiMode ? "none" : "block";
        resetGame();
        toggBtn.innerText = isAiMode ? "Switch to 2-Player Mode" : "Switch to AI Mode";
    });

    startBtn.addEventListener("click", () => {
      playerOName = playerOInput.value || "Player O";
      playerXName = playerXInput.value || "Player X";
      resetGame();
  });