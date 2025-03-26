document.addEventListener("DOMContentLoaded", function() {
    const levelButtons = document.querySelectorAll(".level-btn");
    const quizSection = document.getElementById("quiz-section");
    const quizTitle = document.getElementById("quiz-title");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const feedback = document.getElementById("feedback");
    const resultsSection = document.getElementById("results-section");
    const resultsElement = document.getElementById("results");
    const retryButton = document.getElementById("retry-btn");
    const noteAudio = document.getElementById("note-audio");

    let currentLevel = '';
    let currentQuestionIndex = 0;
    let shuffledQuestions = [];
    let correctAnswersCount = 0;
    const quizData = {
        easy: [
            { question: "Which note is this?", note: "C.wav", answers: ["C", "D", "E", "F"], correct: "C" },
            { question: "Which note is this?", note: "G.wav", answers: ["B", "A", "G", "C"], correct: "G" },
            { question: "Which note is this?", note: "B.wav", answers: ["C", "B", "E", "F"], correct: "B" },
            { question: "Which note is this?", note: "D.wav", answers: ["C", "D", "E", "F"], correct: "D" },
            { question: "Which note is this?", note: "E.wav", answers: ["G", "A", "B", "E"], correct: "E" }
        ],
        medium: [
            { question: "Which note is this?", note: "CC.wav", answers: ["C#/Db", "D#/Eb", "F", "G"], correct: "C#/Db" },
            { question: "Which note is this?", note: "E.wav", answers: ["G", "E", "B", "A#/Bb"], correct: "E" },
            { question: "Which note is this?", note: "A.wav", answers: ["C", "D#/Eb", "E", "A"], correct: "A" },
            { question: "Which note is this?", note: "C.wav", answers: ["C", "D", "E", "F"], correct: "C" },
            { question: "Which note is this?", note: "AA.wav", answers: ["A", "A#/Bb", "D", "F#/Gb"], correct: "A#/Bb" },
            { question: "Which note is this?", note: "D.wav", answers: ["C#/Db", "E", "D", "F"], correct: "D" },
            { question: "Which note is this?", note: "C.wav", answers: ["C", "C#/Db", "E", "F"], correct: "C" }
        ],
        hard: [
            { question: "Which note is this?", note: "DD.wav", answers: ["C", "D#/Eb", "F#/Gb", "A"], correct: "D#/Eb" },
            { question: "Which note is this?", note: "GG.wav", answers: ["C#/Db", "F", "G#/Ab", "B"], correct: "G#/Ab" },
            { question: "Which note is this?", note: "CC.wav", answers: ["C#/Db", "D#/Eb", "F", "G"], correct: "C#/Db" },
            { question: "Which note is this?", note: "E.wav", answers: ["G", "A", "E", "A#/Bb"], correct: "E" },
            { question: "Which note is this?", note: "A.wav", answers: ["C", "D#/Eb", "A", "F#/Gb"], correct: "A" },
            { question: "Which note is this?", note: "C.wav", answers: ["C", "D", "E", "F"], correct: "C" },
            { question: "Which note is this?", note: "AA.wav", answers: ["D", "C", "A#/Bb", "F#/Gb"], correct: "A#/Bb" },
            { question: "Which note is this?", note: "D.wav", answers: ["C#/Cb", "D", "E", "F"], correct: "D" },
            { question: "Which note is this?", note: "C.wav", answers: ["E#", "C#/Db", "C", "F"], correct: "C" }
        ]
    };

    levelButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentLevel = button.getAttribute("data-level");
            startQuiz(currentLevel);
        });
    });

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
        } else {
            showQuizEnd();
        }
    });

    retryButton.addEventListener("click", () => {
        resultsSection.style.display = "none";
        document.getElementById("level-selection").style.display = "block";
    });

    function startQuiz(level) {
        quizSection.style.display = "block";
        document.getElementById("level-selection").style.display = "none";
        quizTitle.textContent = `Quiz - ${level.charAt(0).toUpperCase() + level.slice(1)} Level`;
        shuffledQuestions = quizData[level].sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.textContent = question.question;
        noteAudio.src = `notes/${question.note}`;
        noteAudio.play();
        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("btn");
            button.addEventListener("click", () => selectAnswer(button, question.correct));
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        nextButton.style.display = "none";
        feedback.textContent = '';
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(button, correctAnswer) {
        const selectedAnswer = button.textContent;
        if (selectedAnswer === correctAnswer) {
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
            correctAnswersCount++;
        } else {
            feedback.textContent = "Wrong!";
            feedback.style.color = "red";
        }
        Array.from(answerButtons.children).forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = "green";
            } else {
                btn.style.backgroundColor = "red";
            }
            btn.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showQuizEnd() {
        quizSection.style.display = "none";
        resultsSection.style.display = "block";
        resultsElement.textContent = `You got ${correctAnswersCount} out of ${shuffledQuestions.length} correct!`;
    }
});
