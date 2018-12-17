/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, pastDice, winningScore;

init();



document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
    //1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
    //2. Display the result
    var dice1Dom = document.querySelector (".dice1");
    var dice2Dom = document.querySelector (".dice2")
    dice1Dom.style.display = "block";
    dice2Dom.style.display = "block";
    dice1Dom.src = "dice-" + dice1 + ".png";  
    dice2Dom.src = "dice-" + dice2 + ".png";
    //3. Update the round score if the rolled number was not 1.
    if (dice1 === 6 && pastDice === 6) {
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent = "0";
        nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
        //Add score
        roundScore += dice1 + dice2 ;
        document.getElementById("current-" + activePlayer).textContent = roundScore;

    } else {
        //Next player
        nextPlayer();
    }
    pastDice = dice1;
    }
}
);

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
    //1. Add current score to global score
    scores[activePlayer] += roundScore;
    
    //Upade the UI
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    
    if (document.querySelector(".inputbutton").addEventListener) {
    winningScore = document.querySelector(".inputtext").value;
    } else {
    winningScore = 100;
    }
    
  /* }(document.querySelector("inputbutton").addEventListener) {
        winningScore = input;
        } else {
        winningScore = 100;
        }; */
        
    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.getElementById("name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice1").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
    } else {
        //Next player
        nextPlayer(); 
    } 
    }
});

function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";
        
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active")
        /*document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-1-panel").classList.add("active")*/
        document.querySelector(".dice1").style.display = "none";
        document.querySelector(".dice2").style.display = "none";    
};

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
   
}






