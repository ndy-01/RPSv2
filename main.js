var gameStarted = false;
var gameFinished = false;
var roundFinished = false;
var scoreHuman = 0, scoreComputer = 0, round = 1;
var btnPlay = document.getElementById('play');
var btnRock, btnScissors, btnPaper

defineButtons();
setChoiceListeners();

// Functions

function defineButtons(){
    btnRock = document.getElementById('btnRock');
    btnScissors = document.getElementById('btnScissors');
    btnPaper = document.getElementById('btnPaper');
}

function setChoiceListeners(){
    btnPlay.addEventListener('click', startButton);
    btnPaper.addEventListener('click', function(){
        playRound('PAPER');
    });
    btnScissors.addEventListener('click', function(){
        playRound('SCISSORS');
    });
    btnRock.addEventListener('click', function(){
        playRound('ROCK');
    });
}

function playRound(human){
    if (gameStarted == false){
        return;
    } else {
        if (gameFinished != true){
            var comp = getComputerChoice();
            var winner = checkResult(human,comp);
            showComputerChoice(comp);
            sayWhoWon(winner,human,comp);
            displayScore(scoreHuman,scoreComputer);
            checkIfGameStillGoing();
        } else {
            return;
        }
    }
}

function declareWinnerIfDone(){
    if (gameFinished == true && round == 5){
        round = 6;
        if (scoreHuman > scoreComputer){
            alert ("Human wins");
        } else if (scoreComputer > scoreHuman){
            alert ("Computer wins");
        } else if (scoreHuman == scoreComputer){
            alert ("It was a draw");
        }
    }
}

function checkIfGameStillGoing(){
    if (round < 5){ // Still going
        round++;
    } else if (round = 5){ // This was the last round
        gameFinished = true;
        declareWinnerIfDone();
        resetGame();
    }
}

function resetGame(){
    btnPlay.textContent = "Start Again";
    btnPlay.addEventListener('click',startButton);
}


function findGameWinner(){
    if (scoreHuman > scoreComputer){
        return ("Human wins");
    } else if (scoreComputer > scoreHuman){
        return ("Computer wins");
    } else {
        return ("It was a draw");
    }
}

function checkResult(h,c){
    const P = "PAPER";
    const S = "SCISSORS";
    const R = "ROCK";
    var result;

    // First check for a draw
    if ((h == P && c == P) || (h == S && c == S) || (h == R && c == R)) {
        result = 0;
    } else if ((h == R && c == S) || (h == S && c == P) || (h == P && c == R)) {
        // Human wins
        result = 1;
    } else {
        // Computer wins
        result = 2;
    }
    return result;
}

function sayWhoWon(r,h,c){
    var blurb = "Round: " + round + "\nYou picked: " + h + "\nComputer picked: " + c + "\n";
    switch (r){
        case 0: //Draw
            alert (blurb + "Draw");
            break;
        case 1: //Human wins
            alert (blurb + "Human wins");
            scoreHuman++;
            break;
        case 2: //Computer wins
            alert (blurb + "Computer wins");
            scoreComputer++;
            break;
        default:
            alert("It's fucked");
    }
}


function startButton(){
    var play = document.getElementById('play');
    play.textContent = "Game on!";
    btnPlay.removeEventListener('click',startButton);
    gameStarted = true;
    gameFinished = false;
    scoreHuman = 0;
    scoreComputer = 0;
    round = 1;
    displayScore(scoreHuman,scoreComputer);    
}

function getComputerChoice() {
    let randomNumber = Math.random();

    if (randomNumber < 0.33) {
        return "ROCK";
    } else if (randomNumber >= 0.33 && randomNumber < 0.66) {
        return "PAPER";
    } else {
        return "SCISSORS";
    }
}

function showComputerChoice(choice){
    var displayComputerChoice = document.getElementById('computerChoice');
    displayComputerChoice.textContent = choice;
}

function displayScore(h,c){
    var score = document.getElementById('score');
    score.textContent = "Human: " + h + " Computer: " + c;
}