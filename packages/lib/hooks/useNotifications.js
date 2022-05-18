import { useDispatch, useSelector } from 'react-redux';
import {
    DELETE_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    CLEAR_NOTIFICATIONS
} from '../actions';

export const useNotificationState = () => {
    const store = useSelector(state => state);

    return store.notifications;
};

export const useNotificationDispatch = () => {
    const dispatch = useDispatch();

    return {
        set: data => dispatch({
            type: FETCH_NOTIFICATIONS,
            payload: data
        }),
        deleteNotification: id => dispatch({
            type: DELETE_NOTIFICATION,
            payload: id
        }),
        clear: () => dispatch({
            type: CLEAR_NOTIFICATIONS
        })
    }
}
