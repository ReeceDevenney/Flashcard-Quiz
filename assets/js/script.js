var question1 = {
    question: "flavor text",
    answers: ["Option 1", "Option 2", "Option 3", "Option 4"]
};

var question2 = {
    question: "flavor text",
    answers: ["Option 2", "Option 2", "Option 3", "Option 4"]
};

var question3 = {
    question: "flavor text",
    answers: ["Option 3", "Option 2", "Option 3", "Option 4"]
};

var questionArray = [question1, question2, question3];

var startEl = document.querySelector("#start-screen");

var beginGame = function (event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        startEl.style.display = "none";
    };
};

startEl.addEventListener("click", beginGame);