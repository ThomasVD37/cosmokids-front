import {
    createSlice
} from '@reduxjs/toolkit'
import {
    questions,
    shuffleAnswers
} from '../../assets/quiz'

/**
 * @param {Array: Object} questions Le state est directement définie des datas
 */
const initialState = {
    questions,
    currentQuestionsIndex: 0,
    showResult: false,
    correctAnswerCount: 0,
    answers: shuffleAnswers(questions[0]),
    currentAnswer: '',
    isCorrect: false,
    isStarted: false,
    image: questions[0].img
}

const quizzSlice = createSlice({
    name: "quizz",
    initialState,
    reducers: {
        /**
         * 
         * @param {boolean} showResults Compare la position de la question actuelle par rapport à la longueur de toute les questions. // Renvoie (true) si la comparaison est vrai.
         * @param {number} currentQuestionsIndex Passe à la prochaine question en ajoutant "1" pour passer au prochaine index du tableaux des questions
         * @param {Array} answers Si le résultat est afffiché on vide le tableaux sinon on passe aux prochaines réponses des questions
         * @param {string} correctAnswer Compare la réponse choisi avec la bonne réponse, si vrai on rajoute 1 au compteur de bonne réponse, sinon on ne rajoute rien
         */
        NextQuestions(state) {
            const showResults = state.currentQuestionsIndex === state.questions.length - 1;
            const currentQuestionsIndex = state.currentQuestionsIndex + 1;
            const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuestionsIndex]);
            const correctAnswer = state.isCorrect ? state.correctAnswerCount + 1 : state.correctAnswerCount;
            const image = showResults ? questions[0].img : state.questions[currentQuestionsIndex].img;

            state.currentQuestionsIndex = currentQuestionsIndex;
            state.showResult = showResults;
            state.answers = answers;
            state.currentAnswer = "";
            state.image = image;
            state.isCorrect = false;
            state.correctAnswerCount = correctAnswer;
        },
        // Remise à l'état initial pour recommencer le quizz
        Restart(state) {
            state.currentQuestionsIndex = 0;
            state.showResult = false;
            state.correctAnswerCount = 0;
            state.answers = shuffleAnswers(questions[0]);
            state.isStarted = true;

        },
        Start(state, action) {
            state.currentQuestionsIndex = 0;
            state.showResult = false;
            state.correctAnswerCount = 0;
            state.answers = shuffleAnswers(questions[0]);
            state.isStarted = action.payload;
        },
        /**
         * 
         * @param {string} IsGoodAnswer Compare la réponse choisi avec la bonne réponse, si vrai isCorrect devient vrai, sinon on le passe à faux
         */
        SelectAnswer(state, action) {
            state.currentAnswer = action.payload;
            const IsGoodAnswer = state.currentAnswer === state.questions[state.currentQuestionsIndex].correctAnswer ?
                state.isCorrect = true :
                state.isCorrect = false
            state.isCorrect = IsGoodAnswer;


        }
    }
})

export const {
    NextQuestions,
    Restart,
    Start,
    SelectAnswer
} = quizzSlice.actions;

export const quizzReducer = quizzSlice.reducer;