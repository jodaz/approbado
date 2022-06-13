import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_SIDEBAR } from '../actions';

export const useUiState = () => {
    const store = useSelector(state => state);

    return store.ui;
};

export const useUiDispatch = () => {
    const dispatch = useDispatch();

    return {
        toggleSidebar: () => dispatch({
            type: TOGGLE_SIDEBAR
        })
    }
}
