const outContainer = document.querySelector(".outer-container");
const inContainer = document.querySelector(".inner-container");
const uiContainer = document.querySelector(".ui-container");

const playerElementDiv = document.querySelector(".player-element");
playerElementDiv.textContent = "PLAYER";
const computerElementDiv = document.querySelector(".computer-element");
computerElementDiv.textContent = "COMPUTER";

const results = document.querySelector(".results");
const versus = document.querySelector(".versus");
const images = document.querySelector(".images");

const btnEarth = document.createElement("button");
btnEarth.classList.add("btnElements");
btnEarth.textContent = "EARTH";

const btnFire = document.createElement("button");
btnFire.classList.add("btnElements");
btnFire.textContent = "FIRE";

const btnWater = document.createElement("button");
btnWater.classList.add("btnElements");
btnWater.textContent = "WATER";

// Continue Button & Event Listener to start playing music
const btnStart = document.createElement("button");
btnStart.classList.add("btnStart");
btnStart.textContent = "Start Battle";

// Battle title
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "The Elemental Nations Showdown";

const line = document.createElement("hr");
line.classList.add("line");

const textTyping = document.querySelector("#typing-text");

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
const audio = document.getElementById("background-audio");
// const playButton = document.getElementById('play-button');

// Add a click event listener to the play button
btnStart.addEventListener("click", function () {
  showBattleUI();
  // Check if the audio is paused
  if (audio.paused) {
    // If paused, play the audio
    audio.play();
    btnStart.textContent = "Pause Music";
  } else {
    // If playing, pause the audio
    audio.pause();
    btnStart.textContent = "Play Music";
  }
});

// Battle UI
function showBattleUI() {
  textTyping.textContent = "";
  inContainer.appendChild(title);
  title.appendChild(line);
  btnStart.style.display = "none";
  outContainer.appendChild(inContainer);
  showButtons();
  getPlayerChoice();
}

function showButtons() {
  uiContainer.appendChild(btnEarth);
  uiContainer.appendChild(btnFire);
  uiContainer.appendChild(btnWater);

  const newPositionLeft = 50;
  const newPositionBottom = 50;

  // Update the button's CSS to change its position
  uiContainer.style.position = "absolute";
  uiContainer.style.center = `${newPositionLeft}px`;
  uiContainer.style.bottom = `${newPositionBottom}px`;
}

function hideButtons() {
  uiContainer.removeChild(btnEarth);
  uiContainer.removeChild(btnFire);
  uiContainer.removeChild(btnWater);
}

function newGameButton() {
  const button = document.createElement("button");
  button.classList.add("btnNewGame");
  button.textContent = "NEW GAME";
  uiContainer.appendChild(button);

  button.addEventListener("click", () => {
    uiContainer.removeChild(button);
    clearBattleDisplay();
    showButtons();
  });
}

const playerImage = document.createElement("img");
playerImage.setAttribute("id", "playerImage");

const computerImage = document.createElement("img");
computerImage.setAttribute("id", "computerImage");

const elementImages = {
  Earth: "./assets/earth-removebg-preview.png",
  Fire: "./assets/fire-removebg-preview.png",
  Water: "./assets/water-removebg-preview.png",
};

const uiPlayerScore = document.querySelector(".player-score");
uiPlayerScore.textContent = "0";

const uiComputerScore = document.querySelector(".computer-score");
uiComputerScore.textContent = "0";

// Global choices
const choices = ["Earth", "Fire", "Water"];

function getComputerChoice() {
  const choice = choices[Math.floor(Math.random() * choices.length)];

  switch (choice) {
    case "Earth":
      computerImage.src = elementImages.Earth;
      computerElementDiv.appendChild(computerImage);
      break;
    case "Fire":
      computerImage.src = elementImages.Fire;
      computerElementDiv.appendChild(computerImage);
      break;
    case "Water":
      computerImage.src = elementImages.Water;
      computerElementDiv.appendChild(computerImage);
      break;
  }
  return choice.toUpperCase();
}

function getPlayerChoice() {
  btnEarth.addEventListener("click", (e) => {
    playerImage.src = elementImages.Earth;
    playerElementDiv.appendChild(playerImage);
    playRound(e);
  });

  btnFire.addEventListener("click", (e) => {
    playerImage.src = elementImages.Fire;
    playerElementDiv.appendChild(playerImage);
    playRound(e);
  });

  btnWater.addEventListener("click", (e) => {
    playerImage.src = elementImages.Water;
    playerElementDiv.appendChild(playerImage);
    playRound(e);
  });
}

function playRound(e) {
  const computerChoice = getComputerChoice();
  const playerChoice = e.target.textContent;
  const result = playGame(playerChoice, computerChoice);

  if (playerScore === 5 || computerScore === 5) {
    if (playerScore === 5) {
      results.textContent = "Congratulations! You won the battle of elements.";
    } else {
      results.textContent = "Gameover! You lost.";
    }
    // clearBattleDisplay();
    hideButtons();
    newGameButton();
  }
}

// Check winner
function checkWinner(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) {
    return "Draw";
  } else if (
    (playerChoice == "FIRE" && computerChoice == "EARTH") ||
    (playerChoice == "EARTH" && computerChoice == "WATER") ||
    (playerChoice == "WATER" && computerChoice == "FIRE")
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
    results.textContent = `It's a tie!`;
  } else if (result == "Player") {
    playerScore++;
    results.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
    uiPlayerScore.textContent = playerScore;
  } else {
    computerScore++;
    results.textContent = `You lost! ${computerChoice} beats ${playerChoice}.`;
    uiComputerScore.textContent = computerScore;
  }
}

function clearBattleDisplay() {
  playerElementDiv.removeChild(playerImage);
  computerElementDiv.removeChild(computerImage);

  // Reset scores for a new game
  playerScore = 0;
  computerScore = 0;

  results.textContent = "";
  uiComputerScore.textContent = computerScore;
  uiPlayerScore.textContent = playerScore;
}
