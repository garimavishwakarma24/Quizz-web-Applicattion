const questions = [
    {
        question: "What is the full form of OOP?",
        options: ["Object-Oriented Programming", "Objective-Oriented Programming", "Operational Output Processing", "None of these"],
        answer: "Object-Oriented Programming"
    },
    {
        question: "What type of language is C?",
        options: ["High-level", "Low-level", "Machine-level", "Scripting"],
        answer: "Low-level"
    },
    {
        question: "Which one is a high-level programming language?",
        options: ["Assembly", "C++", "Machine Code", "Binary"],
        answer: "C++"
    },
    {
        question: "Machine language is written in?",
        options: ["English", "C", "Binary", "Hexadecimal"],
        answer: "Binary"
    },
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "Hyper Transfer Mark Language", "HighText Machine Language", "None"],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which of the following is not a programming language?",
        options: ["Python", "Java", "HTTP", "C#"],
        answer: "HTTP"
    },
    {
        question: "Which is not an OOP principle?",
        options: ["Inheritance", "Encapsulation", "Recursion", "Polymorphism"],
        answer: "Recursion"
    },
    {
        question: "Java is a:",
        options: ["Machine-level language", "Assembly language", "High-level language", "Low-level language"],
        answer: "High-level language"
    },
    {
        question: "Which one is a low-level language?",
        options: ["Java", "Python", "Assembly", "C++"],
        answer: "Assembly"
    },
    {
        question: "Which keyword is used to define a class in most languages?",
        options: ["function", "method", "class", "define"],
        answer: "class"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let userName = "";
let startTime, endTime;

const welcomeContainer = document.querySelector(".welcome-container");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const finalResultElement = document.getElementById("final-result");
const nameInput = document.getElementById("name");
const greetingElement = document.getElementById("greeting");
const timerElement = document.getElementById("timer");

document.getElementById("start").addEventListener("click", () => {
    userName = nameInput.value || "User";
    greetingElement.textContent = `Hello, ${userName}! Let's begin the quiz.`;
    welcomeContainer.style.display = "none";
    quizContainer.style.display = "block";
    startTime = Date.now(); // Start the timer when quiz starts
    displayQuestion();
    startTimer();
});

function startTimer() {
    const timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerElement.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
    window.timerInterval = timerInterval; // Store interval reference to clear it later
}

function displayQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = `Q${currentQuestion + 1}. ${q.question}`;
    optionsElement.innerHTML = "";

    q.options.forEach(option => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = option;
        if (userAnswers[currentQuestion] === option) input.checked = true;
        li.appendChild(input);
        li.appendChild(document.createTextNode(" " + option));
        optionsElement.appendChild(li);
    });

    resultElement.textContent = "";
}

function saveAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected) userAnswers[currentQuestion] = selected.value;
}

document.getElementById("next").addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
});

document.getElementById("prev").addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

document.getElementById("submit").addEventListener("click", () => {
    saveAnswer();
    score = 0;
    let wrongAnswers = [];
    
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) {
            score++;
        } else {
            wrongAnswers.push({ question: q.question, selected: userAnswers[i], correct: q.answer });
        }
    });

    clearInterval(window.timerInterval); // Stop the timer when quiz is submitted
    endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // Calculate time taken

    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    finalResultElement.textContent = `Hello ${userName}, your final score is ${score}/${questions.length}`;
    document.getElementById("time-taken").textContent = `Time Taken: ${timeTaken}s`;

    // Display wrong answers
    if (wrongAnswers.length > 0) {
        const wrongAnswersElement = document.createElement("div");
        wrongAnswersElement.innerHTML = "<h3>Wrong Answers</h3>";
        wrongAnswers.forEach(wrong => {
            const wrongAnswerDiv = document.createElement("div");
            wrongAnswerDiv.innerHTML = `
                <p><strong>Question:</strong> ${wrong.question}</p>
                <p><strong>Your Answer:</strong> ${wrong.selected}</p>
                <p><strong>Correct Answer:</strong> ${wrong.correct}</p>
                <hr>
            `;
            wrongAnswersElement.appendChild(wrongAnswerDiv);
        });
        resultContainer.appendChild(wrongAnswersElement);
    }
});
