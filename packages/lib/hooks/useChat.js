import { useDispatch, useSelector } from 'react-redux';
import { SET_CHAT, UNSET_CHAT } from '../actions';

export const useChatState = () => {
    const store = useSelector(state => state);

    return store.chat
};

export const useChatDispatch = () => {
    const dispatch = useDispatch();

    return {
        setChat: data => dispatch({
            type: SET_CHAT,
            payload: data
        }),
        unsetChat: () => dispatch({
            type: UNSET_CHAT
        })
    }
}
