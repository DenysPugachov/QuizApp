import axios from '../../axios/axios-quiz';

import {
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
} from '../actions/actionTypes.js';



export function fetchQuizzes() {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
        try {
            const response = await axios.get("/quizes.json");

            const quizzes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Test #${index + 1}`
                });
            });//error list with test#1

            dispatch(fetchQuizzesSuccess(quizzes));

        } catch (e) {
            dispatch(fetchQuizzesError(e));
        }
    };
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizzesError(e));
        }
    };
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    };
}

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START
    };
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    };

}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    };
}

export function fetchQuizzesError(e) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: e
    };

}

export function finishedQuiz() {
    return {
        type: FINISH_QUIZ
    };
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    };
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    };
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        //prevent double clicking on right answer
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === "success") return;
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            //answer is right
            if (!results[question.questionId]) {
                results[question.questionId] = "success";
            }

            dispatch(quizSetState({ [answerId]: "success" }, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishedQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 200);

            //wrong answer
        } else {
            results[question.questionId] = "error";

            dispatch(quizSetState({ [answerId]: "error" }, results));
        }
    };
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}