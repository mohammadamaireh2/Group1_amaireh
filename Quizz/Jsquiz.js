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
let quizPosition = storedData.position
console.log(quizPosition);
let questionCount;
let scoreCount = 0;
let count = 11;
let timerInterval;
var quizArray = []
//timer

const totalTime = 180;

//Questions html / css / js
if (quizPosition === 'html'){
     quizArray = [
    {
        id: "0",
        question: "Which is the most widely spoken language in the world?",
        options: ["Spanish", "Mandarin", "English", "German"],
        correct: "Mandarin",
        selected: null,
    },
    {
        id: "1",
        question: "Which is the only continent in the world without a desert?",
        options: ["North America", "Asia", "Africa", "Europe"],
        correct: "Europe",
        selected: null,
    },
    {
        id: "2",
        question: "Who invented Computer?",
        options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
        correct: "Charles Babbage",
        selected: null,
    },
    {
        id: "3",
        question: "What do you call a computer on a network that requests files from another computer?",
        options: ["A client", "A host", "A router", "A web server"],
        correct: "A client",
        selected: null,
    },
    {
        id: "4",
        question: "Hardware devices that are not part of the main computer system and are often added later to the system.",
        options: ["Peripheral", "Clip art", "Highlight", "Execute"],
        correct: "Peripheral",
        selected: null,
    },
    {
        id: "5",
        question: "The main computer that stores the files that can be sent to computers that are networked together is:",
        options: ["Clip art", "Mother board", "Peripheral", "File server"],
        correct: "File server",
    }
    
];}


// Initialize userData from local storage or create a new object if not present
let userData = JSON.parse(localStorage.getItem('userData')) || {};

// Add an "answers" property to the userData object if not already present
if (!userData.answers) {
    userData.answers = [];
}

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});



// Timer
const startTimer = () => {
    count = totalTime;
    timeLeft.innerHTML = `${count}s`;
  
    clearInterval(timerInterval);
  
    countdown = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(countdown);
        displayResult();
      } else {
        timeLeft.innerHTML = `${count}s`;
      }
    }, 1000);
  };
  
//Display quiz
let quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    // Hide the previous question card
    if (questionCount > 0) {
        quizCards[questionCount - 1].classList.add("hide");
    }
    // Show the current question 
    quizCards[questionCount].classList.remove("hide");
    
};

let selectedOption = null;
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
    nextBtn.disabled = true;

    // Show the first question card
    quizDisplay(0);
}




// Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
  
    // Disable all options when the user selects one
    options.forEach((element) => {
      element.disabled = true;
    });
  
    // If user clicked answer == correct option store it  in object
    if (userSolution === quizArray[questionCount].correct) {
      userOption.classList.add("correct");
      scoreCount++;
    } else {
      userOption.classList.add("correct");
     
    }
  
    // Store the selected option for current question
    selectedOption = userOption;
    quizArray[questionCount].selected = userSolution;
    // save it to local 
    userData.answers[questionCount] = userSolution;
    // Save the updated userData to local 
    localStorage.setItem('userData', JSON.stringify(userData));
    // Enable the Next button
    nextBtn.disabled = false;
  

    // clearInterval(countdown);
  }
// check result page if it displayed or not
let resultDisplayed = false;
function displayResult()
{
    displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");

        // Display the user score
        userScore.innerHTML =
          
            userScore.innerHTML =
          "Your score is " +
          scoreCount * 10 +
         "% out of " +
         questionCount * 10 +
         "%";
         scoreCount >= 3
        ? (userScore.style.color = "green")
        : (userScore.style.color = "red");

        // Display the result page only if it hasn't been displayed before
        if (!resultDisplayed) {
            let resultContainer = document.createElement("div");
            resultContainer.classList.add("result-container");
        
            for (let i = 0; i < quizArray.length; i++) {
                let questionDiv = document.createElement("div");
                questionDiv.classList.add("result-question");
        
                let questionNumber = document.createElement("p");
                questionNumber.classList.add("result-question-number");
                questionNumber.innerText = "Question " + (i + 1) + ":";
                questionDiv.appendChild(questionNumber);
                
                let questionText = document.createElement("p");
                questionText.classList.add("result-question-text");
                questionText.innerText = quizArray[i].question;
                questionDiv.appendChild(questionText);
                
                let correctAnswer = document.createElement("p");
                correctAnswer.classList.add("result-correct-answer");
                correctAnswer.innerText = "Correct Answer: " + quizArray[i].correct;
                questionDiv.appendChild(correctAnswer);
                
                // Display the user's selected answer
                let selectedAnswer = document.createElement("p");
                selectedAnswer.classList.add("result-selected-answer");
                selectedAnswer.innerText =
                    "Your Answer: " + (quizArray[i].selected ? quizArray[i].selected : "Not Attempted");
                questionDiv.appendChild(selectedAnswer);
        
                resultContainer.appendChild(questionDiv);
            }
            // reset timer
            
            scoreContainer.appendChild(resultContainer);
            resultDisplayed = true;
        }
    
}
nextBtn.addEventListener("click", () => {
    selectedOption = null;
    nextBtn.disabled = true;
    // clearInterval(countdown);
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    if (!countdown) {
        return;
    }
    options.forEach((element) => {
        element.disabled = false;
        element.classList.remove("correct", "incorrect"); // Reset the classes for the options
    });

    // Check if it's the last question
    if (questionCount == quizArray.length - 1) {
        // Hide the question container and display the score
       displayResult();
        
    } else {
        // Clear the selected option before displaying the next question
        selectedOption = null;
        questionCount += 1;
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
        quizDisplay(questionCount);
        //start the timer
        // count = totalTime;
        // startTimer();
        
        // save it to local 
        localStorage.setItem('userData', JSON.stringify(userData));
        // Disable the Next button 
        nextBtn.disabled = true;
        
    }
    
});

 
//start setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
 
    count = totalTime;
  startTimer();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
    nextBtn.disabled = true;
};