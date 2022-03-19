import {
    UNSET_TRIVIA,
    SET_TRIVIA,
    SET_SUBTHEMES,
    UNSET_SUBTHEMES,
    SET_QUESTIONS,
    UNSET_QUESTIONS,
    SET_ANSWER_STATUS,
    PASS_QUESTION,
    UNSET_ANSWER_STATUS
} from '../actions';

const initialState = {
    selected: false, // Si hay una trivia seleccionada
    trivia: {}, // Info de la trivia
    selectedSubthemes: [], // Subtemas seleccionados
    questions: [], // Lista de preguntas
    currQuestion: 0, // Pregunta actual (Jugando)
    is_right: null
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
        case SET_ANSWER_STATUS:
            return {
                ...state,
                is_right: action.payload
            }
        case UNSET_ANSWER_STATUS:
            return {
                ...state,
                is_right: null
            }
        default:
            return state;
    }
}

export default dialogReducer;

