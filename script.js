// Randomly return either 'Rock', 'Paper' or 'Scissors' - Computer Selection
function computerPlay(){
    let possibleOutcome = ['rock', 'raper', 'scissors'];

    // Get a random number between 0 - array.length-1
    // Math.floor(Math.random() * possibleOutcome.length);

    let outcome = possibleOutcome[Math.floor(Math.random() * possibleOutcome.length)];

    return outcome;
}

// Play a round
function playRound(computerSelection, playerSelection){
    let result = "It's a draw! Play again",
        winner = '';

    // Compare playerSelection to computerSelection
    if(playerSelection){
        if(playerSelection.toLowerCase() ?? '' === 'rock'){
            if(computerSelection == 'paper'){
                result = "You Loose! Paper beats Rock";
                winner = 'computer';
    
            }else if(computerSelection === 'scissors'){
                result = "You win! Rock beats Scissors";
                winner = 'player';
            }
        }else if(playerSelection.toLowerCase() ?? '' === 'paper'){
            if(computerSelection == 'rock'){
                result = "You win! Paper beats Rock";
                winner = 'player';
    
            }else if(computerSelection === 'scissors'){
                result = "You Loose! Scissors beats Paper";
                winner = 'computer';
            }
        }else if(playerSelection.toLowerCase() ?? '' === 'scissors'){
            if(computerSelection == 'paper'){
                result = "You win! Scissors beats Paper";
                winner = 'player';
    
            }else if(computerSelection === 'rock'){
                result = "You Loose! Rock beats Scissors";
                winner = 'computer';
            }
        }else{
            result = "wrongInput!";
        }
    }else{
        result = "wrongInput!";
    }

    return {
        result: result,
        winner: winner
    };
}

// compare the winner based on selection

// Play game
function game(){
    let playerScore = 0,
        computerScore = 0;

    for(let i=0; i<5; i++){
        // Get computer Selection
        let computerSelection = computerPlay();
        // Get player Selection
        let playerSelection = prompt('Rock, Paper or Scissors?');

        let round = playRound(computerSelection, playerSelection);

        console.log(round.result);
        
        if(round.winner === 'computer'){
            computerScore += 1;
        }else if(round.winner === 'player'){
            playerScore += 1;
        }
    }
    
    // return game outcome
    console.log("-----------------------------------------------");
    console.log("Player Score: "+playerScore);
    console.log("Computer Score: "+computerScore);
    console.log("-----------------------------------------------");
    if(playerScore > computerScore){
        console.log("yay!! you win.");
    }else{
        console.log("You loose! Try again.");
    }
}

game();