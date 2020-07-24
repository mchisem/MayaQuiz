// paragraph text //
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 5000
  });

//variables//
const start = document.querySelector("#start-button");
var exit = document.querySelector("#exit");
var timer = document.querySelector("#timer");
var next = document.querySelector("#next");
var highScore = document.querySelector("#score");
var navbar = document.querySelector("#nav");
var intro = document.querySelector("#intro");
var questionContainer = document.querySelector(".questions-container");

var shuffledQuestions;
var currentQuestion = 0;
var score = 0;

var secondsLeft = 75;

//start game event listener//
start.addEventListener('click', function(){
    // currentQuestion = 0;
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    startGame();
    nextShuffle();
})

//timer function//
function startGame() {
    navbar.classList.remove("hide");
    intro.classList.add("hide");
    questionContainer.classList.remove("hide");

    var timerInterval = setInterval(function(){
      secondsLeft--;
      timer.textContent = 'Time: ' + secondsLeft;

      if(secondsLeft === 0) {
          clearInterval(timerInterval);
          endGame();
          console.log("Game Over!");
      }
  }, 1000);

}

//quiz question/answer array//
var questions = [
  {
    question:"What is Maya's favorite color?",
    answers: [
      {text: "Yellow, like her skin"},
      {text: "Baby gum pink"},
      {text: "Money green baby", correct: true},
      {text: "A Barney purple"}
    ]
  },
  {
    question:"When is Maya's birthday?",
    answers: [
      {text: "Sometime in the Spring?"},
      {text: "June 20"},
      {text: "January 21"},
      {text: "January 22", correct: true}
    ]
  },
  {
    question:"Has Maya ever been married?",
    answers: [
      {text: "No"},
      {text: "Yes", correct: true}
    ]
  },
  {
    question:"BONUS: What is Maya's social security number?",
    answers: [
      {text: "122-34-5678"},
      {text: "Why do you know this?", correct: true},
      {text: "I don't know,  but I'd like to"},
      {text: "What's a social security number?"},
    ]
  },
  {
    question:"What's Maya's favorite pastime?",
    answers: [
      {text: "Sleeping"},
      {text: "Riding her bike"},
      {text: "Pimpin' baby", correct: true},
      {text: "Crotcheting- ask her to make you a sweater"}
    ]
  },
  {
    question:"Where does she want to travel?",
    answers: [
      {text: "To London so she can try fish and chips"},
      {text: "Any and everywhere she can shawty", correct: true},
      {text: "To Paris so she can see the Eiffle Tower"},
      {text: "Yo mama's house"}
    ]
  }
];

// display quesitons and answers // 
var questionTitle = document.querySelector(".title");
var answers = document.querySelector(".answer");

function showQuestion(question) {
    questionTitle.innerHTML = question.question;
    question.answers.forEach(function (answer) {
        var button = document.createElement("button");
        button.innerText = answer.text
        button.classList.add("answer");
        answers.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
          }
          button.addEventListener('click', pickAnswer)
    })
}

// answer selection
function pickAnswer(e) {
    const selectedAnswer = e.target
    const correct = selectedAnswer.dataset.correct
    const wrong = selectedAnswer.dataset.wrong
    checkAnswer(document.body, correct)
    Array.from(answers.children).forEach(button => {
    checkAnswer(button, button.dataset.correct)
})
    if (shuffledQuestions.length > currentQuestion + 1) {
        console.log("you got" + score + "/100");
    }  else {
        endGame();
    }
}

function checkAnswer(button, correct) {
    if(correct) {
        button.classList.add("right");
        score+=10;
        highScore.textContent = 'Score: ' + score;

    } else {
        button.classList.add("wrong");
        score-=0;
        highScore.textContent = 'Score: ' + score;
    }
}

// next button event listener//
next.addEventListener('click', function(){
    currentQuestion++;
    nextShuffle();
})

// randomly shuffles questions//
function nextShuffle() {
    clearAnswers();
    showQuestion(shuffledQuestions[currentQuestion]);
}

// clear out the previous answers//
function clearAnswers(){
    while(answers.firstChild) {
        answers.removeChild
        (answers.firstChild)
    }
}

//end game screen//
function endGame() {
    clearInterval(timer);
  
    var gameOver =
      `
      <h3>Game Over!</h3>
      <div class="answers-container">
        You got ${score}/100
      <div>

      `
    document.querySelector(".questions-container").innerHTML = gameOver;
  }

// end quiz score/input name
// var input = document.querySelector("#name");
// var submit = document.querySelector("#submit");

// function inputName () {
//     submit.addEventListener("click", userInfo)
// }

// function userInfo(){
//     var name = createInput.value;
//     localStorage.setItem("name", name);
//     localStorage.setItem("score", score);
//     window.location.href = "highscores.html";
// }