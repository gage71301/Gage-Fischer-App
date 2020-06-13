$(initializeApp);


const STORE = [

    {
       question: 'What do you call a male Duck?' ,
       answers: [ 

            'Duckling',
           'Goose',
           'Mallard',
           'Drake' 
       ],
       correctAnswer: 'Mallard'
    },

    {
        question: 'How fast can Ducks fly?' ,
        answers: [

            '40 - 60mph',
            '25 - 40mph',
            '80 - 90mph',
            '10 - 20mph'
        ],
        correctAnswer: '40 - 60mph'
    },

    {
        question: 'What helps Ducks fly after swimming?' ,
        answers: [

            'They float',
            'Waterproof feathers',
            'Long wings',
            'Aerodynamic body'
        ],
        correctAnswer: 'Waterproof feathers'
    },

    {
        question: 'How many species of Ducks are there?' ,
        answers: [
            '200',
            '78',
            '150',
            '250'
        ],
        correctAnswer: '150'
    },

    {
        question: 'What age do young Ducks usually start flying?' ,
        answers: [
            '50 - 60 days',
            '20 - 40 days',
            '80 - 100 days',
            '70 - 80 days'
        ],
        correctAnswer: '50 - 60 days'
    },



]

let currentQuestion = 0;
let correctAnswers = 0;

function gradeAnswer() {
    $("#questionContainer").on("submit", "#questionForm", function(event) {
        event.preventDefault();

        const userChoice = $(event.currentTarget).find("input[type=radio]:checked").val();

        if (currentQuestion < STORE.length) {
            
            const questionObject = STORE[currentQuestion];
            if (!userChoice) {
                alert("No Answer Selected");

            } else if (userChoice === questionObject.correctAnswer) {
                let correctFeedBack = `<h1>Good Job!</h1> 
                                <p>Answer: ${questionObject.correctAnswer}</p>`
                correctAnswers++;
                updateScore(currentQuestion, correctAnswers);


                $(".questionResult").hide();
                $(".correctAnswerFB").html(correctFeedBack).addClass("greenbox").show();      

            } else {
                updatescore(currentQuestion);
                showCorrect();
            }
            currentQuestion++;

            const question = STORE[currentQuestion];
            if (question) {
                renderQuestion(question);    
            }   
        }

        if (currentQuestion === STORE.length) {
            $("#quizBegin").show();
        }
    });
}

function startQuiz() {
    $(".quizContainer").hide();
    $('#mainApp').on('click', '#quizBegin', function(event) {
        event.preventDefault();

        currentQuestion = 0;

        correctAnswers = 0;

        const question = STORE[currentQuestion];

        renderQuestion(question);

        $(".questionResult").hide();

        $(".correctAnswerFB").hide()

        $("#quizBegin").hide();

        $("#quizScore").show();

        $(".quizContainer").show();

        updateScore(currentQuestion, correctAnswers);

    });
}

function updateScore(currentQuestion, correctAnswers) {
    const currentCorrect = correctAnswers;
    $('#questionIndex').text(currentQuestion +1);

    $('.questionTotal').text(STORE.length);

    $('.rightAnsIndex').text(correctAnswers);

}

function renderIndividualAnswer(answer, index) {
    return `<li>
        <input type="radio" id="answer-${index}" name="answer" value="${answer}" required />
        <label for="answer-${index}">${answer}</label>
    </li>`;
}

function renderAnswers(question) {
    return question.answers.map((currentAnswer, i) => renderIndividualAnswer(currentAnswer, i)).join("");
}

function renderQuestion(question) {
    const questionAnswers = renderAnswers(question);

    const questionNode = `<form id="questionForm">
                            <h3>${question.question}</h3>
                            <ul id="answerList">${questionAnswers}</ul>
                            <button>Submit</button>
                          </form>`;


    $('#questionContainer').html(questionNode);
}

function showCorrect() {
    let questionObject = STORE[currentQuestion];
    let currentCorrectAnswer = questionObject.correctAnswer;

    const questionResultBox = `<h1>Incorrect</h1><h2>Correct Answer: ${currentCorrectAnswer}</h2>`;
    $(".correctAnswerFB").hide();
    $(".questionResult").html(questionResultBox).addClass("resultStyle");
    $(".questionResult").show();
}

function initializeApp() {
    startQuiz();
    gradeAnswer();
}




