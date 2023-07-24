// JavaScript code
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let storedData = JSON.parse(localStorage.getItem('userData'));

let quizPosition = storedData ? storedData.position : 'html'; // Provide a default value if 'userData' doesn't exist in localStorage

console.log(quizPosition);

let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let quizArray = [];

// ... (rest of the code) ...

// Checker Function to check if option is correct or not
function checker(userOption) {
  // ... (rest of the existing code) ...
}

// ... (rest of the existing code) ...

// check result page if it displayed or not
let resultDisplayed = false;
nextBtn.addEventListener("click", () => {
  // ... (rest of the existing code) ...
});

// ... (rest of the existing code) ...

// initial setup
function initial() {
  // ... (rest of the existing code) ...
}

// when the user clicks on the start button
startButton.addEventListener("click", () => {
  // ... (rest of the existing code) ...
});

// hide quiz and display the start screen
window.onload = () => {
  // ... (rest of the existing code) ...
};
