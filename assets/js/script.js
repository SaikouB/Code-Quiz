document.title = "Javascript Code Quiz";

var startButtonEl = document.querySelector("#strt-btn");
var questionEl = document.querySelector("#question");
var optionsEl = document.querySelector("#choices");
var timerCountEl = document.querySelector("#timer-count");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var saveScoreEl = document.querySelector("#save-scr-btn")

var presentQuestionIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var answer = "";
var timeLeft = 120;
var endQuiz = false;
var options = []

// var quizCompleted = false;

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

// Start timer function
function startTimer() {
	timer = setInterval(function () {
		timeLeft--;
		timerCountEl.textContent = timeLeft;
		// Checks to see if user has finished quiz before time runs out
		if (endQuiz && timeLeft > 0) {
			// This stops the timer and clears interval
			clearInterval(timer);
			stopQuiz();
		}
		// Time is out? stop timer!
		if (timeLeft <= 0) {
			clearInterval(timer);
			stopQuiz();
		}
	}, 1000) // 1 second time interval
}

//Function to start quiz and timer
function startQuiz() {
	// Hides "#question" and "#choices" before user clicks start button
	question.classList.remove("hidden");
	choices.classList.remove("hidden");
	// Presents questions to start at 0 index
	presentQuestionIndex = 0;
	// revealQuestion & startTimer functions to kickoff when start button is clicked
	revealQuestion();
	startTimer();
	// Disables start button after click so user must refresh page to retake quiz
	var startButtonEl = document.getElementById("strt-btn");
	startButtonEl.disabled = true;
}

// This function Reveals first question in array and loops through questionArr length
function revealQuestion() {
	//
	var presentQuestion = questionArr[presentQuestionIndex];
	var questionNum = presentQuestionIndex + 1;
	questionEl.innerHTML = questionNum + "." + presentQuestion.question;

	// Replaces options in HTML option-buttons with options from questionArr
	optionsEl.innerHTML = "";
	//this line iterates through each option in the questionArr options array
	questionArr[presentQuestionIndex].options.forEach(function (options, index) {
		// Creates a new element "button"
		var optionButton = document.createElement("button");
		// Sets text value of "button" to current options by "textContent" property
		optionButton.textContent = options;
		// Adds styling via CSS to "button"
		optionButton.classList.add("btn");
		// Sets attribute "option-btn" to button and adds it to index of current option in array
		optionButton.setAttribute("option-btn", index);
		// "click" event listener to check user answer
		optionButton.addEventListener("click", checkAnswer);
		// optionButton appended as a child to optionsEl
		optionsEl.appendChild(optionButton);
	});
}

// Stop quiz function and gives feedback
function stopQuiz() {
	timerCountEl.textContent = 0
	// Hides "#choices" but not "#question" so user can see their score
	questionEl.textContent = ""
	choices.classList.add("hidden");
	clearInterval(timer);

	var score = correctCount;
	questionEl.textContent = "Quiz is Complete! Your score is: " + score + " out of " + questionArr.length;

	if (timeLeft <= 0 && endQuiz === false) {
		questionEl.textContent = "Sorry, It looks like you're out of time! You scored: " + score + " out of " + questionArr.length;
	}
}

// checkAnswer function to verify if user selected correct/incorrect option and tracks correct and incorrect counts
function checkAnswer(event) {
	var userSelectionIndex = event.target.getAttribute("option-btn");
	var presentQuestion = questionArr[presentQuestionIndex];
	var userSelectOption = presentQuestion.options[userSelectionIndex];
	var correctAnswer = presentQuestion.answer;

	// Allows user to move forward to next question after picking an option.
	presentQuestionIndex++;

	// user selects option for question, add data to respective count
	if (userSelectOption === correctAnswer) {
		correctCount++;
	} else {
		incorrectCount++;
	}
	// If user selection is not equal to correct answer then decrement 5 seconds from time left interval
	if (userSelectOption !== correctAnswer) {
		timeLeft -= 5;
	}
	if (timeLeft <= 0 && presentQuestionIndex >= questionArr.length) {
		stopQuiz();
		timeLeft = 0;
		console.log("found it")
	}
	//  If statement checks to see if more questions are available, if not, stop quiz.
	if (presentQuestionIndex < questionArr.length) {
		revealQuestion();
	} else {
		stopQuiz();
	}
	// Variable used to display user current correct count
	var displayScore = document.getElementById("correct-count");
	displayScore.textContent = "CORRECT: " + correctCount;
	// Variable used to display user current incorrect count
	var displayScore = document.getElementById("incorrect-count");
	displayScore.textContent = "INCORRECT: " + incorrectCount;
}

var scoreList = []

// "click" event function Allows user to save score by initials
saveScoreEl.addEventListener("click", function (event) {
	event.preventDefault();
	var input = document.getElementById("Init-Input")
	// Handles user values inclusing correct count and "text" input
	var userValues = {
		initials: input.value,
		score: correctCount
	}
	// Pushes user values to local storage using var scoreList
	scoreList.push(userValues)
	localStorage.setItem("userScore", JSON.stringify(scoreList))
})

// Event listener to start quiz after start quiz buttin is clicked
startButtonEl.addEventListener("click", startQuiz)