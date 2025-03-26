document.addEventListener("DOMContentLoaded", function() {
    const quizSection = document.getElementById("quiz-section");
    const quizTitle = document.getElementById("quiz-title");
    const questionElement = document.getElementById("question");
    const inputsContainer = document.getElementById("inputs-container");
    const feedback = document.getElementById("feedback");
    const resultsSection = document.getElementById("results-section");
    const resultsElement = document.getElementById("results");
    const retryButton = document.getElementById("retry-btn");
    const noteAudio = document.getElementById("note-audio");
    const playAudioButton = document.getElementById("play-audio");
    const submitButton = document.getElementById("submit-btn");

    let currentQuestionIndex = 0;
    let shuffledQuestions = [];
    let correctAnswersCount = 0;

    const questions = [
        { question: "Identify the notes in this sequence:", note: "1.wav", correct: ["F", "A", "G", "C"] },
        { question: "Identify the notes in this sequence:", note: "2.wav", correct: ["C#", "F#", "D#", "G#"] },
        { question: "Identify the notes in this sequence:", note: "3.wav", correct: ["A", "C", "E", "D"] },
        { question: "Identify the notes in this sequence:", note: "4.wav", correct: ["F#", "G#", "A", "D"] },
        { question: "Identify the notes in this sequence:", note: "5.wav", correct: ["C#", "D#", "E", "F#"] },
        { question: "Identify the notes in this sequence:", note: "6.wav", correct: ["D", "A", "B", "D"] },
        { question: "Identify the notes in this sequence:", note: "7.wav", correct: ["B", "G", "D", "A"] }
    ];

    document.getElementById("start-btn").addEventListener("click", startQuiz);

    retryButton.addEventListener("click", () => {
        resultsSection.style.display = "none";
        document.getElementById("start-section").style.display = "block";
    });

    function startQuiz() {
        quizSection.style.display = "block";
        document.getElementById("start-section").style.display = "none";
        quizTitle.textContent = "";
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
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
        playAudioButton.addEventListener("click", () => noteAudio.play());
    }

    function resetState() {
        feedback.textContent = '';
        inputsContainer.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Note ${i + 1}`;
            inputsContainer.appendChild(input);
        }
    }

    submitButton.addEventListener("click", () => {
        const inputs = Array.from(inputsContainer.getElementsByTagName("input"));
        const userAnswers = inputs.map(input => input.value.trim().toUpperCase());
        const correctAnswers = shuffledQuestions[currentQuestionIndex].correct;
        
        if (userAnswers.every((answer, index) => answer === correctAnswers[index])) {
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
            correctAnswersCount++;
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                setTimeout(setNextQuestion, 1000);
            } else {
                setTimeout(showQuizEnd, 1000);
            }
        } else {
            feedback.textContent = "Wrong!";
            feedback.style.color = "red";
            showQuizEnd();
        }
    });

    function showQuizEnd() {
        quizSection.style.display = "none";
        resultsSection.style.display = "block";
        resultsElement.textContent = `You got ${correctAnswersCount} out of ${shuffledQuestions.length} correct!`;
    }
});
