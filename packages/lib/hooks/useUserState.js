import { useDispatch, useSelector } from 'react-redux';
import { setUser, unsetUser, fetchUser } from '../actions';

export const useUserState = () => {
    const store = useSelector(state => state);

    return store.user;
};

export const useUserDispatch = () => {
    const dispatch = useDispatch();

    return {
        setUser: data => dispatch(setUser(data)),
        unsetUser: () => dispatch(unsetUser()),
        fetchUser: () => dispatch(fetchUser())
    }
}
