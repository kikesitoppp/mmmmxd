const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

const questions = [
    {
        question: "¿Cuál es mi nombre completo?",
        type: "text",
        correctAnswer: "DENIS ENRIQUE BENAVIDES CAIPE"
    },
    {
        question: "¿Cuál es la fecha de mi nacimiento en formato DD/MM/AAAA?",
        type: "text",
        correctAnswer: "13/04/2004"
    },
    {
        question: "¿Cuál es la fecha de nuestro cumple meses o aniversario (número)?",
        type: "text",
        correctAnswer: "24"
    },
    {
        question: "¿Cuál es mi equipo favorito?",
        type: "multiple",
        options: ["Bayer Munich", "Bayern Munchen", "Bayern Munich", "Bayern de Múnich"],
        correctAnswer: "Bayern de Múnich"
    },
    {
        question: "¿Cuál es mi jugador favorito?",
        type: "text",
        correctAnswer: "NEYMAR"
    },
    {
        question: "¿Dónde fue nuestro primer beso?",
        type: "multiple",
        options: ["Universidad", "Boulevard", "Coctiki", "Parque"],
        correctAnswer: "Coctiki"
    },
    {
        question: "Si respondes esta pregunta te mereces unos ricos besos, ¿cuáles son las dos palabras que más nos hemos dicho en nuestros chats? (en mayúsculas)",
        type: "text",
        correctAnswer: "TE QUIERO"
    }
];

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startBtn.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <div id="question-container">
                <h2>${currentQuestion.question}</h2>
                ${generateInputField(currentQuestion)}
                <button id="next-btn">Siguiente</button>
                <div id="error-message"></div>
                <div id="success-message"></div>
            </div>
        `;
        document.getElementById('next-btn').addEventListener('click', checkAnswer);
    } else {
        showResults();
    }
}

function generateInputField(question) {
    if (question.type === 'text') {
        return '<input type="text" id="answer" class="question">';
    } else if (question.type === 'multiple') {
        return question.options.map(option => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `).join('');
    }
}

function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    let userAnswer;

    if (currentQuestion.type === 'text') {
        userAnswer = document.getElementById('answer').value.trim();
    } else if (currentQuestion.type === 'multiple') {
        userAnswer = document.querySelector('input[name="answer"]:checked');
        if (userAnswer) {
            userAnswer = userAnswer.value;
        }
    }

    if (userAnswer === currentQuestion.correctAnswer) {
        document.getElementById('success-message').innerText = '¡EXCELENTE MI AMOR SIGUE ASÍ!';
        correctAnswers++;
    } else {
        document.getElementById('error-message').innerText = '❌ Error ❌';
        incorrectAnswers++;
    }

    currentQuestionIndex++;
    setTimeout(showQuestion, 2000);
}

function showResults() {
    quizContainer.innerHTML = `
        <h2>Resultados</h2>
        <p>Correctas: ${correctAnswers}</p>
        <p>Incorrectas: ${incorrectAnswers}</p>
        ${generateFinalMessage()}
    `;
}

function generateFinalMessage() {
    if (correctAnswers === questions.length) {
        return '<p>Me quiero mucho, pero yo te quiero más :)</p>';
    } else if (correctAnswers > incorrectAnswers) {
        return '<p>Me quieres pero quiéreme más :)</p>';
    } else {
        return '<p>No me quieres :(</p>';
    }
}
