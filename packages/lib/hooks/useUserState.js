import { useDispatch, useSelector } from 'react-redux';
import { setUser, unsetUser, fetchUser } from '../actions';

export const useUserState = () => {
    const store = useSelector(state => state);

    return store.user;
};

export const usePlan = (planName) => {
    const plan = useSelector(state => state.user.user.memberships[0].plans);

    if (planName) {
        console.log(planName == 'Free')
        if (planName == 'Free') return false;
        return planName == plan.name
    }

    return plan;
}

export const useUserDispatch = () => {
    const dispatch = useDispatch();

    return {
        setUser: data => dispatch(setUser(data)),
        unsetUser: () => dispatch(unsetUser()),
        fetchUser: () => dispatch(fetchUser())
    }
}
