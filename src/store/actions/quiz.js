import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZ_SUCCESS
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
            console.log(quiz);
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

export function fetchQuizzesError(e) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: e
    };

}