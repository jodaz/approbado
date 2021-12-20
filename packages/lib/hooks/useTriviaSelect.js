import { useDispatch, useSelector } from 'react-redux';
import { setTrivia, unsetTrivia } from '../actions';

export const useTriviaState = () => {
    const store = useSelector(state => state);

    return store.trivia;
};

export const useTriviaDispatch = () => {
    const dispatch = useDispatch();

    return {
        setTrivia: data => dispatch(setTrivia(data)),
        unsetTrivia: data => dispatch(unsetTrivia(data))
    }
}
