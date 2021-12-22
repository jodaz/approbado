import { useDispatch, useSelector } from 'react-redux';
import { setUser, unsetUser } from '../actions';

export const useUserState = () => {
    const store = useSelector(state => state);

    return store.user;
};

export const useUserDispatch = data => {
    const dispatch = useDispatch();

    return {
        setUser: () => dispatch(setUser(data)),
        unsetUser: () => dispatch(unsetUser(data))
    }
}
