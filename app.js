//bugs
// after the score became 0 then it is again incrementing from the previous value : FIXED!!!
//who has the chance to play first? it is rondom in this case

let roll = document.querySelector(".roll-button");
let score1 = Number(document.querySelector(".score1").textContent);

let score2 = Number(document.querySelector(".score2").textContent);

roll.addEventListener("click", function () {


  var roundScore = Number(document.querySelector(".round-score").textContent);

  const dice1 = document.querySelector("#dice1");
  const dice2 = document.querySelector("#dice2");




  //randomly rolling the dices
  var dice1val = Math.floor(Math.random() * 6) + 1;
  var dice2val = Math.floor(Math.random() * 6) + 1;

  dice1.src = "/Dice_Images/dice_" + dice1val + ".png";
  dice2.src = "/Dice_Images/dice_" + dice2val + ".png";

  roundScore = dice1val + dice2val;
  sessionStorage.setItem("roundScore", roundScore);
  document.querySelector(".round-score").textContent = roundScore;




  //getting active player from the session storage in browser

  if (!sessionStorage.getItem("activePlayer")) {
    sessionStorage.setItem("activePlayer", 1);
  }

  let activePlayer = sessionStorage.getItem("activePlayer");
  updateStyle(activePlayer);




  //winner condition 

  if (score1 >= 100) {
    document.querySelector(".dice").innerHTML = `<div class="dice-images">
          <h1 style=margin-top:200px;>PLAYER 1 WON</h1>
          <img src="/win.gif">
           <button class="restart" onclick="location.reload()">RESTART</button>
        </div>`;
  }
  if (score2 >= 100) {
    document.querySelector(".dice").innerHTML = `<div class="dice-images">
          <h1 style=margin-top:200px;>PLAYER 2 WON</h1>
          <img src="/win.gif">
           <button class="restart" onclick="location.reload()">RESTART</button>
        </div>`;
  }




   //when the two values ane not same then the next player will get the chance.

  if (dice1val != dice2val) {

    

    updateScore(roundScore, activePlayer);

    activePlayer == 1 ? (activePlayer = 2) : (activePlayer = 1);

    sessionStorage.setItem("activePlayer", activePlayer);
    roundScore = 0;
  }




  //when both dices get value 1 then the score will be reduced to 0
  if (dice2val === dice1val && dice2val == 1) {
    if (activePlayer == 1) {
      score1 = 0;
      document.querySelector(".score1").textContent = score1;
      
      activePlayer = 2;
    } else {
      score2 = 0;
      document.querySelector(".score2").textContent = score2;
      activePlayer = 1;
    }

    sessionStorage.setItem("activePlayer", activePlayer);
    roundScore = 0;
  }


   //when the two values are same the player gets another chance to rool the dice

  if (dice1val === dice2val && dice1val != 1) {
    updateScore(roundScore, activePlayer);
    roundScore = 0;
  }

});

let hold = document.querySelector(".hold-score");

hold.addEventListener("click",function() {

let roundScore = Number(sessionStorage.getItem("roundScore"));
let activePlayer = sessionStorage.getItem("activePlayer");

updateScore(roundScore, activePlayer);
activePlayer == 1 ? (activePlayer = 2) : (activePlayer = 1);
sessionStorage.setItem("activePlayer", activePlayer);

  
})


//--------------------------------------------------------------------------------------------------------------------


//update Score function

function updateScore(roundScore, activePlayer) {
  if (activePlayer == 1) {
    score1 += roundScore;
    document.querySelector(".score1").textContent = score1;
  }
  if (activePlayer == 2) {
    score2 += roundScore;
    document.querySelector(".score2").textContent = score2;
  }
}





//update style of the active player using this function
function updateStyle(activePlayer) {
  if (activePlayer == 1) {
    document.querySelector(".current-player").textContent = "Player 1";

    document.querySelector(".player1").style.backgroundColor =
      "rgba(44, 72, 88)";
    document.querySelector(".player2").style.backgroundColor =
      "rgba(25, 41, 50)";
  }
  if (activePlayer == 2) {
    document.querySelector(".current-player").textContent = "Player 2";
    document.querySelector(".player2").style.backgroundColor =
      "rgba(44, 72, 88)";
    document.querySelector(".player1").style.backgroundColor =
      "rgba(25, 41, 50)";
  }
}

