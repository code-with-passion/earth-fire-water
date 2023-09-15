const outContainer = document.querySelector(".outer-container");
const inContainer = document.querySelector(".inner-container");
const uiContainer = document.querySelector(".ui-container");

// const earth = document.createElement("img");
// const fire = document.createElement("img");
// const water = document.createElement("img");
// earth.setAttribute("src", "./assets/earth-removebg-preview.png");
// fire.setAttribute("src", "./assets/fire-removebg-preview.png");
// water.setAttribute("src", "./assets/water-removebg-preview.png");

const results = document.querySelector(".results");
const versus = document.querySelector(".versus");
const images = document.querySelector(".images");
const playerElement = document.querySelector(".player-element")
const computerElement = document.querySelector(".computer-element");

const btnEarth = document.createElement("button");
btnEarth.setAttribute("id", "btnEarth");
btnEarth.classList.add("btnElements");
btnEarth.textContent = "EARTH";
// image.appendChild(btnEarth);

const btnFire = document.createElement("button");
btnFire.setAttribute("id", "btnFire");
btnFire.classList.add("btnElements");
btnFire.textContent = "FIRE";

const btnWater = document.createElement("button");
btnWater.setAttribute("id", "btnWater");
btnWater.classList.add("btnElements");
btnWater.textContent = "WATER";

// Continue Button & Event Listener to start playing music
const btnStart = document.createElement("button");
btnStart.classList.add('btnStart');
btnStart.textContent = "Start Battle";

// Battle title
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "The Elemental Nations Showdown";

const line = document.createElement("hr");
line.classList.add("line");

const textTyping = document.querySelector('#typing-text');

// Define the text you want to type
const textToType =
  "As the ground trembles with the might of Earth nation, the flames of Fire nation dance with fury, and the waters of Water nation surge with power, the stage is set for an epic battle of the elements!";

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
      showContinueButton();
    }, 2000); // Adjust the delay before removal (in milliseconds)
  }
}

// Display continue button
function showContinueButton() {
  setTimeout(() => {
    outContainer.appendChild(btnStart);
  }, 2000);
}

// Start the typing effect after 3secs
setTimeout(() => {
  typeText();
}, 3000);

// Background music event listener
const audio = document.getElementById('background-audio');
// const playButton = document.getElementById('play-button');

// Add a click event listener to the play button
btnStart.addEventListener('click', function () {
  showBattleUI();
  // Check if the audio is paused
  // if (audio.paused) {
  //   // If paused, play the audio
  //   audio.play();
  //   btnStart.textContent = "Pause Music";
  // } else {
  //   // If playing, pause the audio
  //   audio.pause();
  //   btnStart.textContent = "Play Music";
  // }
});

// Battle UI
function showBattleUI() {
  textTyping.textContent = "";
  inContainer.appendChild(title);
  title.appendChild(line);
  btnStart.style.display = 'none';
  
  outContainer.appendChild(inContainer);
  
  uiContainer.appendChild(btnEarth);
  uiContainer.appendChild(btnFire);
  uiContainer.appendChild(btnWater);

  
  const newPositionLeft = 50; // New left position in pixels
  const newPositionBottom = 50; // New bottom position in pixels
  
  // Update the button's CSS to change its position
  uiContainer.style.position = "absolute";
  uiContainer.style.center = `${newPositionLeft}px`;
  uiContainer.style.bottom = `${newPositionBottom}px`;

  // inContainer.appendChild(images);
  // inContainer.appendChild(results);

  getPlayerChoice();
}

// Global choices
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
      // Check for a winner after each round
      if (playerScore === 5 || computerScore === 5) {
        if (playerScore === 5) {
          results.textContent = "Congratulations! You won the battle of elements.";
        } else {
          results.textContent = "Gameover! Better luck next time.";
        }
        // Reset scores for a new game
        playerScore = 0;
        computerScore = 0;
      }
      return result;
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

// Game round
function playGame(playerChoice, computerChoice) {
  const result = checkWinner(playerChoice, computerChoice);
  if (result == "Draw") {
    results.textContent = `It's a tie! Your score: ${playerScore}, Enemy score: ${computerScore}`;
  } else if (result == "Player") {
    playerScore++;
    results.textContent = `You win! ${playerChoice} beats ${computerChoice}. Your score: ${playerScore}, Enemy score: ${computerScore}`;
  } else {
    computerScore++;
    results.textContent = `You lost! ${computerChoice} beats ${playerChoice}. Enemy score: ${computerScore}, Your score: ${playerScore}`;
  }
}
