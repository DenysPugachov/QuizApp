import {
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUIZZES_START,
    FETCH_QUIZ_SUCCESS
} from './../actions/actionTypes';

const initialState = {
    quizzes: [],
    loading: false,
    error: null,
    results: {}, //{[id]: success error}
    isQuizFinished: false,
    activeQuestion: 0,
    answerState: null, //{[id]:"success"/"error"}
    quiz: null,
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZZES_START:
            return {
                ...state, loading: true,
            };
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state, loading: false, quizzes: action.quizzes,
            };
        case FETCH_QUIZZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            };

        default:
            return state;
    }
}