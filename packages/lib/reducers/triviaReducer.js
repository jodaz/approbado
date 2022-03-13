import {
    UNSET_TRIVIA,
    SET_TRIVIA,
    SET_SUBTHEMES,
    UNSET_SUBTHEMES,
    SET_QUESTIONS,
    UNSET_QUESTIONS
} from '../actions';

const initialState = {
    selected: false,
    trivia: {},
    selectedSubthemes: [],
    questions: []
}

const dialogReducer = (
    state = initialState,
    action
) => {
    console.log(action.payload)
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
        default:
            return state;
    }
}

export default dialogReducer;

