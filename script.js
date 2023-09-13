const container = document.querySelector(".outer-container");
const btnEarth = document.createElement("button");
const btnFire = document.createElement("button");
const btnWater = document.createElement("button");

btnEarth.classList.add('btnEarth');
btnEarth.classList.add('btnFire');
btnEarth.classList.add('btnWater');

btnEarth.textContent = "EARTH";
btnFire.textContent = "FIRE";
btnWater.textContent = "WATER";

const textTyping = document.querySelector('#typing-text');



// container.appendChild(btnEarth);
// container.appendChild(btnFire);
// container.appendChild(btnWater);


// Define the text you want to type
const textToType =
  "As the ground trembles with the might of Earth nation, the flames of Fire nation dance with fury, and the waters of Water nation surge with power, the stage is set for an epic battle of the elements!";

// Get the element where you want to display the typing effect
// const textTyping = document.getElementById("inner-container");

// Initialize a variable to keep track of the current character
let charIndex = 0;

// Function to simulate typing
function typeText() {
  // Check if we've typed all the characters
  if (charIndex < textToType.length) {
    // Get the next character and append it to the element
    const char = textToType.charAt(charIndex);
    textTyping.textContent += char;
    charIndex++;

    // Call this function again after a certain time interval (e.g., 100 milliseconds)
    setTimeout(typeText, 60); 
  } else {
    // Phrase is fully typed, now remove it
    setTimeout(() => {
      textTyping.textContent = "Who will dominate and emerge victorious?";
    }, 2000); // Adjust the delay before removal (in milliseconds)
  }
}

// Start the typing effect
typeText();


// global choices
const choices = ["Earth", "Fire", "Water"];

function getComputerChoice() {
  const choice = choices[Math.floor(Math.random() * choices.length)];
  return choice.toLowerCase();
}

function getPlayerChoice() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const playerChoice = button.textContent.toLowerCase();
      const computerChoice = getComputerChoice();
      const result = playGame(playerChoice, computerChoice);
      console.log(result);

      // Check for a winner after each round
      if (playerScore === 5 || computerScore === 5) {
        if (playerScore === 5) {
          div.textContent = "Congratulations! You won the battle of elements.";
          container.appendChild(div);
        } else {
          div.textContent = "Gameover! Better luck next time.";
          container.appendChild(div);
        }

        // Reset scores for a new game
        playerScore = 0;
        computerScore = 0;
      }
    })
  );
}

// check winner
function checkWinner(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) {
    return "Draw";
  } else if (
    (playerChoice == "fire" && computerChoice == "earth") ||
    (playerChoice == "earth" && computerChoice == "water") ||
    (playerChoice == "water" && computerChoice == "fire")
  ) {
    return "Player";
  } else {
    return "Computer";
  }
}

let playerScore = 0;
let computerScore = 0;

// game round
function playGame(playerChoice, computerChoice) {
  const result = checkWinner(playerChoice, computerChoice);
  if (result == "Draw") {
    div.textContent = `It's a tie! Your score: ${playerScore}, Enemy score: ${computerScore}`;
    container.appendChild(div);
  } else if (result == "Player") {
    playerScore++;
    div.textContent = `You win! ${playerChoice} beats ${computerChoice}. Your score: ${playerScore}, Enemy score: ${computerScore}`;
    container.appendChild(div);
  } else {
    computerScore++;
    div.textContent = `You lost! ${computerChoice} beats ${playerChoice}. Enemy score: ${computerScore}, Your score: ${playerScore}`;
    container.appendChild(div);
  }
}

function app() {
  getPlayerChoice();
}

app();