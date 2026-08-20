const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//QUIZ STATE VARS

let currentQuestionIndex =0;
let score =0;
let answersDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length

//Event Listeners

startButton.addEventListener("click",startQuiz)
restartButton.addEventListener("click",restartQuiz)

function startQuiz(){
    console.log("Quiz started");

    currentQuestionIndex=0;
    score=0;

    scoreSpan.textContent=score

    startScreen.classList.add("hidden");
    startScreen.classList.remove("flex");

    quizScreen.classList.remove("hidden");
    quizScreen.classList.add("flex");

    showQuestion()

}

function showQuestion(){
  answersDisabled=false

  const currentQuestion =quizQuestions[currentQuestionIndex]

  currentQuestionSpan.textContent=currentQuestionIndex+1

  const progressPercent=(currentQuestionIndex/quizQuestions.length) *100;
  progressBar.style.width=progressPercent + "%"

  questionText.textContent =currentQuestion.question

  answersContainer.innerHTML="";

  currentQuestion.answers.forEach(answer =>{
    const button =document.createElement("button")
    button.textContent=answer.text
    button.classList.add(
      "w-full",
      "bg-yellow-100",
      "rounded-md",
      "p-2",
      "border",
      "border-gray-300",
      "shadow-md",
      "hover:bg-yellow-400"
    );

    button.dataset.correct=answer.correct;

    button.addEventListener("click",selectAnswer);

    answersContainer.appendChild(button);
  })
}

function selectAnswer(event){

  if(answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct == "true";

  Array.from(answersContainer.children).forEach((button)=>{
    if (button.dataset.correct === "true"){
      button.classList.add(
      "bg-green-100",
      "border-green-400",
      "text-green-700");
    } else if(button === selectedButton) {
      button.classList.add("bg-red-100",
      "border-red-400",
      "text-red-700")
    }
  });

  if (isCorrect){
    score++;
    scoreSpan.textContent=score
  }

  setTimeout(()=>{
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length){
      showQuestion()
    } else {
      showResults()
    }
  },1000)
}


function showResults(){
  quizScreen.classList.add("hidden");
  quizScreen.classList.remove("flex");

  resultScreen.classList.add("flex");
  resultScreen.classList.remove("hidden");

  finalScoreSpan.textContent=score;

  const percentage = (score/quizQuestions.length) *100

  if(percentage === 100) {
  resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
  resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
  resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
  resultMessage. textContent = "Not bad! Try again to improve!";
  } else {
  resultMessage.textContent = "Keep studying! You'll get better!";
  }
}


function restartQuiz(){
  resultScreen.classList.add("hidden");
  resultScreen.classList.remove("flex");
    
  startQuiz();
}

