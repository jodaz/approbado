import {
    UNSET_TRIVIA,
    SET_TRIVIA,
    SET_SUBTHEMES,
    UNSET_SUBTHEMES,
    SET_QUESTIONS,
    UNSET_QUESTIONS,
    PASS_QUESTION
} from '../actions';

const initialState = {
    selected: false,
    trivia: {},
    selectedSubthemes: [],
    questions: [],
    currQuestion: 0
}

const dialogReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SET_TRIVIA:
            return {
                ...state,
                selected: true,
                trivia: action.payload,
            }
        case SET_SUBTHEMES: {
            return {
                ...state,
                selectedSubthemes: [...state.selectedSubthemes, action.payload]
            }
        }
        case UNSET_SUBTHEMES: {
            return {
                ...state,
                selectedSubthemes: state.selectedSubthemes.filter(({ id }) => id != action.payload)
            }
        }
        case SET_QUESTIONS: {
            return {
                ...state,
                questions: [...state.questions, ...action.payload]
            }
        }
        case UNSET_QUESTIONS: {
            return {
                ...state,
                questions: state.questions.filter(({ id }) => id != action.payload)
            }
        }
        case UNSET_TRIVIA:
            return initialState;
        case PASS_QUESTION:
            return {
                ...state,
                currQuestion: state.currQuestion + 1
            }
        default:
            return state;
    }
}

export default dialogReducer;

