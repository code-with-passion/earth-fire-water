// global choices
const choices = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
  const choice = choices[Math.floor(Math.random() * choices.length)];
  return choice.toLowerCase();
}

function getPlayerChoice() {
  const choice = prompt("Choose your weapon Rock - Paper - Scissors?");

  if (choice == "rock" || choice == "paper" || choice == "scissors") {
    return choice.toLowerCase();
  } else {
    getPlayerChoice();
  }
}

// check winner
function checkWinner(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) {
    return "Draw";
  } else if (
    (playerChoice == "rock" && computerChoice == "scissors") ||
    (playerChoice == "paper" && computerChoice == "rock") ||
    (playerChoice == "scissors" && computerChoice == "paper")
  ) {
    return "Player";
  } else {
    return "Computer";
  }
}

// calculate score
function calcScore() {
  return playerScore === computerScore
    ? "The Game is DRAW!"
    : playerScore > computerScore
    ? "You WON! You are amazing!"
    : "You LOSE! Better luck next time.";
}

let playerScore = 0;
let computerScore = 0;

// game round
function playGame(playerChoice, computerChoice) {
  const result = checkWinner(playerChoice, computerChoice);
  if (result == "Draw") {
    return `It's a tie! Your score: ${playerScore}, Enemy score: ${computerScore}`;
  } else if (result == "Player") {
    playerScore++;
    return `You win! ${playerChoice} beats ${computerChoice}. Your score: ${playerScore}, Enemy score: ${computerScore}`;
  } else {
    computerScore++;
    return `You lost! ${computerChoice} beats ${playerChoice}. Enemy score: ${computerScore}, Your score: ${playerScore}`;
  }
}

// main caller
function app() {
  for (let i = 0; i < 5; i++) {
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    console.log(playGame(playerChoice, computerChoice));
  }
  console.log(calcScore());
}

app();
