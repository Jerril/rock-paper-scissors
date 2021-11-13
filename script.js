const playBtn = document.querySelectorAll('.choice');
const playerChoiceImg = document.querySelector('.player .choice-img');
const computerChoiceImg = document.querySelector('.com .choice-img');
const commentaryDiv = document.querySelector('.commentary');
const commentary = document.querySelector('.commentary div p');

let restartBtn = '';

let playerScore = 0,
    computerScore = 0;
    tieScore = 0;

// Event Listeners
playBtn.forEach(el => el.addEventListener('click', playGame));
commentaryDiv.addEventListener('click', restartGame)

// Randomly return either 'Rock', 'Paper' or 'Scissors' - Computer Selection
function computerPlay(){
    let possibleOutcome = ['rock', 'paper', 'scissors'];
    let outcome = possibleOutcome[Math.floor(Math.random() * possibleOutcome.length)];
    return outcome;
}

// Play a round
function playRound(computerSelection, playerSelection){
    let result = "It's a tie!",
        winner = 'none';

    // Compare playerSelection to computerSelection
    if(playerSelection === 'rock'){
        if(computerSelection == 'paper'){
            result = "You lost! Paper covers Rock";
            winner = 'computer';

        }else if(computerSelection === 'scissors'){
            result = "You win! Rock crushes Scissors";
            winner = 'player';
        }

        return {
            result,
            winner
        }
    }
    
    if(playerSelection === 'paper'){
        if(computerSelection == 'rock'){
            result = "You win! Paper covers Rock";
            winner = 'player';

        }else if(computerSelection === 'scissors'){
            result = "You lost! Scissors cuts Paper";
            winner = 'computer';
        }

        return {
            result,
            winner
        }
    }
    
    if(playerSelection === 'scissors'){
        if(computerSelection == 'paper'){
            result = "You win! Scissors cuts Paper";
            winner = 'player';

        }else if(computerSelection === 'rock'){
            result = "You lost! Rock crushes Scissors";
            winner = 'computer';
        }

        return {
            result,
            winner
        }
    }

    return {
        result,
        winner
    };
}

// Game over
function endGame(){
    playBtn.forEach(el => {
        el.disabled = true;
        el.style.opacity = .2;
    });

    commentary.style.fontWeight = '600';
    if(computerScore > playerScore){
        commentary.textContent = "You lost! Game Over 😞";
    }else{
        commentary.textContent = "You won! Game Over 🎉"
    }

    restartBtn = document.createElement('button');
    restartBtn.classList.add('restart-btn');
    restartBtn.textContent = 'Restart game'

    document.querySelector('.commentary div').appendChild(restartBtn);
}

// Restart Game
function restartGame(e){
    if(e.target.classList.contains('restart-btn')) {
        // score update & display
        playerScore = 0;
        computerScore = 0;
        tieScore = 0;

        document.querySelector('.score-board .com p:last-child').textContent = computerScore;
        document.querySelector('.score-board .player p:last-child').textContent = playerScore;
        document.querySelector('.score-board .ties p:last-child').textContent = tieScore;

        // choice image
        playerChoiceImg.setAttribute('src', `images/none.png`);
        computerChoiceImg.setAttribute('src', `images/none.png`);

        // play button enable
        playBtn.forEach(el => {
            el.disabled = false;
            el.style.opacity = 1;
        });

        // commentary
        commentary.textContent = "";
        commentary.style.color = 'black';

        // commentary button
        restartBtn.remove();
    }
}

// Play game
function playGame(e){
    let computerSelection = computerPlay();
    // Get player Selection
    let playerSelection = e.target.getAttribute('data-key');

    // update the ui based on each selection
    playerChoiceImg.setAttribute('src', `images/${playerSelection}.png`);
    computerChoiceImg.setAttribute('src', `images/${computerSelection}.png`);

    // update scores & display
    let round = playRound(computerSelection, playerSelection);

    if(round.winner === 'computer'){
        computerScore += 1;
        document.querySelector('.score-board .com p:last-child').textContent = computerScore;
        commentary.style.color = 'red';
    }else if(round.winner === 'player'){
        playerScore += 1;
        document.querySelector('.score-board .player p:last-child').textContent = playerScore;
        commentary.style.color = 'green';
    }else{
        tieScore += 1;
        document.querySelector('.score-board .ties p:last-child').textContent = tieScore;
        commentary.style.color = 'black';
    }
    commentary.textContent = round.result;

    // if any of the player has a round score == 5; end game
    if(computerScore >= 5 || playerScore >= 5 ){
        endGame();
    }
}