import {
    UNSET_TRIVIA,
    SET_TRIVIA,
    SET_SUBTHEMES,
    UNSET_SUBTHEMES,
    SET_QUESTIONS,
    UNSET_QUESTIONS,
    SET_ANSWER,
    PASS_QUESTION,
    SET_CONFIGS,
    SET_RESULTS,
    UPDATE_COUNTER,
    FETCH_RESULTS_FAILED,
    START_COUNTER
} from '../actions';

const initialState = {
    selected: false, // Si hay una trivia seleccionada
    trivia: {}, // Info de la trivia
    selectedSubthemes: [], // Subtemas seleccionados
    questions: [], // Lista de preguntas
    currQuestion: 0, // Pregunta actual (Jugando)
    answers: [],
    selectedAwards: [],
    configs: {
        type: '',
        view: '',
        level: '',
        duration: 0
    },
    rights: 0,
    points: 0,
    error: '',
    secs: 0,
    participants: []
}

const dialogReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case START_COUNTER:
            return {
                ...state,
                secs: action.payload
            }
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
        case PASS_QUESTION:
            return {
                ...state,
                currQuestion: state.currQuestion + 1
            }
        case SET_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.payload]
            }
        case SET_CONFIGS:
            return {
                ...state,
                configs: {
                    ...state.configs,
                    ...action.payload
                }
            }
        case SET_RESULTS:
            return {
                ...state,
                ...action.payload
            }
        case FETCH_RESULTS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_COUNTER: {
            return {
                ...state,
                secs: action.payload
            }
        }
        case UNSET_TRIVIA:
            return initialState;
        default:
            return state;
    }
}

export default dialogReducer;

