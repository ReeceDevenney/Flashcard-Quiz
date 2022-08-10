var questionArray = [
    {
        question: "What symbol is used to contain the values of an Array?",
        answers: ["()", "{}", "[]", ".."],
        correct: "[]"
    },
    {
        question: "What does HTML stand for?",
        answers: ["Hypertext Markup Language", "How to Make Lasagne", "Hypertext Markdown Language", "Hypertext Markup Link"],
        correct: "Hypertext Markup Language"
    },
    {
        question: "What does Javascript do on a webpage?",
        answers: ["adds overall styling", "adds the starting text of the page", "It doesn't affect webpages", "Adds functionality and user interactivity"],
        correct: "Adds functionality and user interactivity"
    },
    {
        question: "what is the correct output of console.log('1'+'1')?",
        answers: ["2", "'1'+'1'", "11", "10"],
        correct: "11"  
    },
    {
        question: "what does CSS stand for?",
        answers: ["Cryptic Style Sheets", "Coding Style Sheets", "Cascading Style Sheets", "Cool Style Sheets"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "Which HTML tag is used to connect the HTML document to the Javascript document?",
        answers: ["Script", "Link", "Meta", "Body"],
        correct: "Script"
    },
    {
        question: "Which symbol selects a class in CSS?",
        answers: ["!", "#", "$", "."],
        correct: "."
    },
    {
        question: "What is the correct way to write multi-word variables in Javascript?",
        answers: ["Cobra Case", "Camel Case", "Pascal Case", "Zebra Case"],
        correct: "Camel Case"
    },
    {
        question: "what is the outter most box in the CSS box model?",
        answers: ["Blank Space", "Padding", "Content", "Margin"],
        correct: "Margin"
    }

];

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
    if (endGameEl.style.display === "none") {
        endGameEl.style.display = "inline"
    } else {
        var initialsEl = document.createElement("input");
        initialsEl.className = "initials"
        endGameEl.appendChild(initialsEl);
        var submitInitialsEl = document.createElement("button");
        submitInitialsEl.textContent = "submit";
        endGameEl.appendChild(submitInitialsEl);
    }
    corIncorEl.textContent = "";
    var questionEl = document.querySelector("#questions");
    questionEl.textContent = "";

    for (i = 0; i < 4; i++) {
        var removeAnswerEl = document.querySelector(".answer-btn");
        removeAnswerEl.remove();
    };



    timer = timer + 1
}


var goToLeaderboard = function (event) {
    var initialsInputEl = document.querySelector(".initials");
    event.preventDefault();
    var gameStats = {
        name: initialsInputEl.value,
        score: timer
    }
    highScoreArray.push(gameStats);
    highScoreArray.sort((a, b) => b.score - a.score);
    highScoreArray = highScoreArray.slice(0, 5);
    saveTasks();

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
    returnEl.innerHTML = "<button>Main Menu</button>"
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
        returnEl.innerHTML = ""
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