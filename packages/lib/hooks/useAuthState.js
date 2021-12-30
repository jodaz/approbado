import { useSelector } from 'react-redux';

export const useAuthState = () => {
    const store = useSelector(state => state);

    return { authenticated: store.user.isAuth };
};
