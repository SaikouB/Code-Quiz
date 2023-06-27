document.title = "Javascript Code Quiz";

var startButtonEl = document.querySelector("#strt-btn");
var questionEl = document.querySelector("#question");
var optionsEl = document.querySelector("#choices");
// var nextButtonEl = document.querySelector("#nxt-btn");
var timerCountEl = document.querySelector("#timer-count");
var correct = document.querySelector("#correct-count")
var incorrect = document.querySelector("#incorrect-count")
var question = document.getElementById("question");
var choices = document.getElementById("choices");


var presentQuestionIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var answer = "";
var timeLeft = 10;
var endQuiz;
var options = [];
var quizCompleted = false;

var questionArr = [
	{
		num: 1,
		question: " Javascript is an _______ language?",
		answer: "Object-Oriented",
		options: ["Object-Oriented",
			"Subject-Based",
			"Procedure-Based",
			"All of the above"
		]
	},
	{
		num: 2,
		question: " Which of the following methods is used to access HTML elements using Javascript?",
		answer: "Both A and B",
		options: ["getElementById()",
			"getElementByClassName()",
			"Both A and B",
			"None of the above"
		]
	},
	{
		num: 3,
		question: " Which JavaScript method is used to access an HTML element by id?",
		answer: "getElementById()",
		options: ["getElementById()",
			"getElement(id)",
			"getElementById(id)",
			"elementById(id)"
		]
	},
	{
		num: 4,
		question: " JavaScript ignores?",
		answer: "All of the above",
		options: ["newlines",
			"tabs",
			"spaces",
			"All of the above"
		]
	},
	{
		num: 5,
		question: " Which JavaScript method is used to write on browser's console?",
		answer: "console.log()",
		options: ["console.writeHTML()",
			"console.write()",
			"console.output()",
			"console.log()"
		]
	},
	{
		num: 6,
		question: " What are the types of Pop up boxes available in JavaScript?",
		answer: "All of the above",
		options: ["Prompt",
			"Alert",
			"Confirm",
			"All of the above"
		]
	},
	{
		num: 7,
		question: " All of the following are JavaScript Data types except:",
		answer: "Minus",
		options: ["Number",
			"Minus",
			"String",
			"Boolean"
		]
	},
	{
		num: 8,
		question: " Which symbol is used for single line comments in Javascript?",
		answer: "//",
		options: ["/* --- */",
			"<!-- -->",
			"//",
			"<|*-- --*|>",
		]
	},
	{
		num: 9,
		question: " What is === operator called?",
		answer: "Strict equality",
		options: ["Strict equality",
			"Value(loose) equality",
			"No equality",
			"Equality"
		]
	},
	{
		num: 10,
		question: " Which of the following is not a type of pop-up in JavaScript?",
		answer: "Notify",
		options: ["Alert",
			"Confirm",
			"Prompt",
			"Notify"
		]
	}
];



// This fuction starts timer
function startTimer() {
	timer = setInterval(function () {
		timeLeft--;
		timerCountEl.textContent = timeLeft;
		// Checks to see if user has finished quiz
		if (endQuiz && timeLeft > 0) {
			// This stops the timer and clears interval
			clearInterval(timer);
			stopQuiz();
		}
		// Time is out? stop timer!
		if (timeLeft === 0) {
			clearInterval(timer);
			stopQuiz();
		}
	}, 1000) // 1 second time interval
}

//Function to start quiz and timer
function startQuiz() {
	question.classList.remove("hidden");
	choices.classList.remove("hidden");
	// Presents questions to start at 0 index
	presentQuestionIndex = 0;
	// Keeps track of correct/incorrect score
	correct = 0;
	incorrect = 0;
	// revealQuestion & startTimer functions to kickoff when start button is clicked
	revealQuestion();
	startTimer();
	// Disables start button so user must refresh page to retake quiz
	var startButtonEl = document.getElementById("strt-btn");
	startButtonEl.disabled = true;
}

// This function Reveals first question in array and loops through questionArr
function revealQuestion() {
	//
	var presentQuestion = questionArr[presentQuestionIndex];
	var questionNum = presentQuestionIndex + 1;
	questionEl.innerHTML = questionNum + "." + presentQuestion.question;

	// Replaces options in HTML option-buttons with options from questionArr
	optionsEl.innerHTML = "";

	questionArr[presentQuestionIndex].options.forEach(function (options, index) {
		var optionButton = document.createElement("button");
		optionButton.textContent = options;
		optionButton.classList.add("btn");
		optionButton.setAttribute("option-btn", index);
		optionButton.addEventListener("click", checkAnswer);
		optionsEl.appendChild(optionButton);
	});
}
function stopQuiz() {
	choices.classList.add("hidden");
	clearInterval(timer);

	var score = correctCount;
	questionEl.textContent = "Quiz is Complete! Your score is: " + score + " out of " + questionArr.length;
}

// checkAnswer fuction to verify if user selected correct option
function checkAnswer(event) {
	var userSelectionIndex = event.target.getAttribute("option-btn");
	var presentQuestion = questionArr[presentQuestionIndex];
	var userSelectOption = presentQuestion.options[userSelectionIndex];
	var correctAnswer = presentQuestion.answer;

	// If user selects correct option for question, add data to respective count
	if (userSelectOption === correctAnswer) {
		correctCount++;
	} else {
		incorrectCount++;
	}
	// Allows user to move forward to next question after picking an option.
	presentQuestionIndex++;

	//  If statement checks to see if more questions are available, if not, stop quiz.
	if (presentQuestionIndex < questionArr.length) {
		revealQuestion();
	} else {
		stopQuiz();
	}

	var displayScore = document.getElementById("correct-count");
	displayScore.textContent = "CORRECT: " + correctCount;

	var displayScore = document.getElementById("incorrect-count");
	displayScore.textContent = "INCORRECT: " + incorrectCount;
}


function setScore() {
	localStorage.setItem("quizScore", score);
}

// Updates correct count on screen and stores correct count to local storage
function setCorrect() {
	correct.textContent = ("correctCount", correctCount);
	localStorage.setItem("correctCount", correctCount)
}

// Updates incorrect count on screen and stores incorrect count to local storage
function setIncorrect() {
	incorrect.textContent = ("incorrectCount", incorrectCount);
	localStorage.setItem("incorrectCount", incorrectCount)
}

startButtonEl.addEventListener("click", startQuiz)
timerCountEl.addEventListener("click", startTimer)




// code to decrement time when user chooses incorrect option
// code for user to save initials and score
// Use local storage to store to user high scores and initials