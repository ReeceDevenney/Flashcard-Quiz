var question1 = {
    question: "flavor text1",
    answers: ["Option 1", "Option 2", "Option 3", "Option 4"]
};

var question2 = {
    question: "flavor text2",
    answers: ["Option 2", "Option 2", "Option 3", "Option 4"]
};

var question3 = {
    question: "flavor text3",
    answers: ["Option 3", "Option 2", "Option 3", "Option 4"]
};

var questionArray = [question1, question2, question3];

var startEl = document.querySelector("#start-screen");
var gameEl = document.querySelector("#game-screen");
questionNumber = 0

// removes the content of the start screen and calls the initializeGame function
var beginGame = function (event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        startEl.style.display = "none";
        initializeGame()
    };
};
// adds the html for the first question to appear
var initializeGame = function () {
    var questionEl = document.querySelector("#questions");
    questionEl.textContent = questionArray[questionNumber].question;

    var answersEl = document.querySelector("#answers");
   
    for (var i = 0; i < questionArray[questionNumber].answers.length; i++){
        var answerOptionEl = document.createElement("li");
        answerOptionEl.setAttribute("data-answer-id", i) 
        answerOptionEl.className = "answer-btn"
        answerOptionEl.innerHTML = "<button>" + questionArray[questionNumber].answers[i]; + "</button>";

        answersEl.appendChild(answerOptionEl);
    };
    questionNumber++
};

// function that plays the game by reacting to the answers that the player choses
var playGame = function() {
    var questionEl = document.querySelector("#questions");
    questionEl.textContent = questionArray[questionNumber].question;

    for (var i = 0; i < questionArray[questionNumber].answers.length; i++){
        var updateAnswersEl = document.querySelector(".answer-btn[data-answer-id='" + i + "']");
        updateAnswersEl.innerHTML = "<button class='answer-btn'>" + questionArray[questionNumber].answers[i]; + "</button>";
    };
    questionNumber++
}


startEl.addEventListener("click", beginGame);
gameEl.addEventListener("click", playGame);
