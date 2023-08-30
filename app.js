// get computer choice
function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    if (choice === 1) {
        return "rock";
    } else if (choice === 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

// get player choice
function getPlayerChoice() {
    let playerPrompt = prompt("Welcome to Rock-Paper-Scissors! Type your choice: ");
    const choice = playerPrompt.toLowerCase();
    if (choice === 'rock' || choice === 'paper' || choice === 'scissors') {
        return choice;
    } else {
        console.log("Invalid choice. Please choose between 'rock', 'paper', or 'scissors'.");
        return getPlayerChoice();
    }
}

// play the game
function playGame(computer, player) {
    if (player === 'rock' && computer === 'scissors') {
        console.log ("You Win! Rock beats Scissors.");
    } else if (player === 'scissors' && computer === 'paper') {
        console.log ("You win! Scissors beats Paper.");
    } else if (player === 'paper' && computer === 'rock') {
        console.log ("You win! Paper beats Rock.")
    } else if (computer === 'rock' && player === 'scissors') {
        console.log ("You lost! Rock beats Scissors.");
    } else if (computer === 'scissors' && player === 'paper') {
        console.log ("You lost! Scissors beats Paper.");
    } else if (computer === 'paper' && player === 'rock') {
        console.log ("You lost! Paper beats Rock.")
    } else {
        console.log ("Draw!");
    }
}

for (let i = 5; i > 0; i--) {
    playGame(getComputerChoice(), getPlayerChoice());
}