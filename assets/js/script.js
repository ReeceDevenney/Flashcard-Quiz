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

highScoreArray = []

var startEl = document.querySelector("#start-screen");
var gameEl = document.querySelector("#game-screen");
var timerEl = document.querySelector("#timer")
var leaderboardEl = document.querySelector("#leaderboard")
var leaderboardHeaderEl = document.querySelector("#leaderboard-header");
var returnEl = document.querySelector("#main-menu-btn")

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
// starts the timer counting down and gives the condition in which the game will end. time running out or all questions being answered
var timer = 90
var startTimer = function () {
    var timerInt = setInterval(function () {
        timerEl.textContent = "timer: " + timer
        timer--
        if (timer < 0 || questionNumber > questionArray.length) {
            clearInterval(timerInt)
            endGame()
        }
    }, 1000)

}



// adds the html for the first question to appear
var initializeGame = function () {
    startTimer()
    questionNumber = 0
    timer = 90
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
            timer = timer - 10
            timerEl.textContent = "timer: " + timer
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
        // end game if all questions have been answered. questionNumber++ is needed to make timer stop at game end
    } else if (questionNumber === questionArray.length) {
        if (event.target.textContent != questionArray[questionNumber - 1].correct) {
            timer = timer - 10;
            timerEl.textContent = "timer: " + timer
        };
        questionNumber++
    };
}

var endGame = function () {
        loadTask();
        endGameEl.style.display = "inline"
        var questionEl = document.querySelector("#questions");
        questionEl.textContent = "";

        for (i = 0; i < 4; i++) {
            var removeAnswerEl = document.querySelector(".answer-btn");
            removeAnswerEl.remove();
        };

        corIncorEl.textContent = "";

        var initialsEl = document.createElement("input");
        initialsEl.className = "initials"
        endGameEl.appendChild(initialsEl);
        var submitInitialsEl = document.createElement("button");
        submitInitialsEl.textContent = "submit";
        endGameEl.appendChild(submitInitialsEl);

        timer = timer + 1
    }


var goToLeaderboard = function (event) {
    var initialsInputEl = document.querySelector(".initials");
    event.preventDefault();
    var gameStats = {
        name: initialsInputEl.value,
        score: timer
    }
    highScoreArray.push(gameStats)
    saveTasks()

    endGameEl.style.display = "none"

    createLeaderboard();
}


var createLeaderboard = function () {
    //creates the leaderboard header

    leaderboardHeaderEl.textContent = "YOUR SCORES!"

    // creats the list of highscores
    var scoresEl = document.querySelector("#scoreboard");
    for (var i = 0; i < highScoreArray.length; i++) {
        var scoreEntryEl = document.createElement("li");
        scoreEntryEl.textContent = highScoreArray[i].name + ":    " + highScoreArray[i].score

        scoresEl.appendChild(scoreEntryEl);
    };

    returnEl.className = "return-btn"
    returnEl.innerHTML = "<button>MainMenu</button>"
};

var returnMenu = function (event) {
    var targetsEl = event.target;

    if (targetsEl.matches("button")) {
        startEl.style.display = "inline";

        for (i = 0; i < highScoreArray.length; i++) {
            var removescoreEl = document.querySelector("li");
            removescoreEl.remove();
        };

        leaderboardHeaderEl.textContent = ""
        returnEl.remove()
    };
}


var saveTasks = function () {
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
}

var loadTask = function () {
    var pastscores = localStorage.getItem("highScoreArray")
    pastscores = JSON.parse(pastscores)
    if (pastscores) {
        highScoreArray = pastscores
    }
    
};



startEl.addEventListener("click", beginGame);
gameEl.addEventListener("click", playGame);
endGameEl.addEventListener("submit", goToLeaderboard)
leaderboardEl.addEventListener("click", returnMenu)
