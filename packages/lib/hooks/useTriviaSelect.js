import { useDispatch, useSelector } from 'react-redux';
import {
    setTrivia,
    unsetTrivia,
    setQuestions,
    unsetQuestions,
    passQuestion,
    setAnswer,
    setConfigs,
    unsetAnswerStatus,
    getResults
} from '../actions';

export const useTriviaState = () => {
    const store = useSelector(state => state);

    return store.trivia;
};

export const useTriviaDispatch = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);

    return {
        setTrivia: data => dispatch((data.id != store.trivia.trivia.id) ? setTrivia(data) : unsetTrivia()),
        unsetTrivia: () => dispatch(unsetTrivia()),
        setQuestions: data => dispatch(setQuestions(data)),
        unsetQuestions: data => dispatch(unsetQuestions(data)),
        passQuestion: () => dispatch(passQuestion()),
        unsetAnswer: () => dispatch(unsetAnswerStatus()),
        setConfigs: data => dispatch(setConfigs(data)),
        setAnswer: data => dispatch(setAnswer(data)),
        getResults: () => dispatch(getResults())
    }
}
