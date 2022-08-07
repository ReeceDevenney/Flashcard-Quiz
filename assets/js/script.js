var question1 = {
    question: "flavor text1",
    answers: ["Option 1", "Option 2", "correct1", "Option 4"],
    correct: "correct1",
};

var question2 = {
    question: "flavor text2",
    answers: ["Option 2", "correct2", "Option 3", "Option 4"],
    correct: "correct2",
};

var question3 = {
    question: "flavor text3",
    answers: ["Option 3", "Option 2", "Option 3", "correct3"],
    correct: "correct3",
};

var questionArray = [question1, question2, question3];

var startEl = document.querySelector("#start-screen");
var gameEl = document.querySelector("#game-screen");
var timerEl = document.querySelector("#timer")

var corIncorEl = document.querySelector("#correct-incorrect");
var endGameEl = document.querySelector("#end-game")

questionNumber = 0


// removes the content of the start screen and calls the initializeGame function
var beginGame = function (event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        startEl.style.display = "none";
        initializeGame()
    };
};

var timer = 90
var startTimer = function () {
    var test = setInterval(function () {
        timerEl.textContent = "timer: " + timer
        timer--
        if (timer < 0) {
            clearInterval(test)
        }
    }, 1000)

}



// adds the html for the first question to appear
var initializeGame = function () {
    startTimer()
    // fills in the p tag with the first question
    var questionEl = document.querySelector("#questions");
    questionEl.textContent = questionArray[questionNumber].question;

    var answersEl = document.querySelector("#answers");
    // creates buttons that act as the 4 answer options
    for (var i = 0; i < questionArray[questionNumber].answers.length; i++) {
        var answerOptionEl = document.createElement("li");
        answerOptionEl.setAttribute("data-answer-id", i)
        answerOptionEl.className = "answer-btn"
        answerOptionEl.innerHTML = "<button>" + questionArray[questionNumber].answers[i]; + "</button>";

        answersEl.appendChild(answerOptionEl);
    };
    questionNumber++
};

// function that plays the game by reacting to the answers that the player choses
var playGame = function (event) {
    if (questionNumber < questionArray.length) {
        //checks for it the answer chosen was correct or incorrect
        if (event.target.textContent === questionArray[questionNumber - 1].correct) {
            corIncorEl.textContent = "✅ CORRECT"
        } else {
            corIncorEl.textContent = "❌ INCORRECT"
        }
        // adds the next questions to the p tag
        var questionEl = document.querySelector("#questions");
        questionEl.textContent = questionArray[questionNumber].question;
        // adds the new answer options
        for (var i = 0; i < questionArray[questionNumber].answers.length; i++) {
            var updateAnswersEl = document.querySelector(".answer-btn[data-answer-id='" + i + "']");
            updateAnswersEl.innerHTML = "<button class='answer-btn'>" + questionArray[questionNumber].answers[i]; + "</button>";
        };
        questionNumber++
    } else {
        var questionEl = document.querySelector("#questions");
        questionEl.textContent = "";

        for (i = 0; i < 4; i++) {
            var removeAnswerEl = document.querySelector(".answer-btn");
            removeAnswerEl.remove();
        };

        corIncorEl.textContent = "";

        var initialsEl = document.createElement("input");
        endGameEl.appendChild(initialsEl);
        var submitInitialsEl = document.createElement("button");
        submitInitialsEl.textContent = "submit";
        endGameEl.appendChild(submitInitialsEl);
    };
}





startEl.addEventListener("click", beginGame);
gameEl.addEventListener("click", playGame);
