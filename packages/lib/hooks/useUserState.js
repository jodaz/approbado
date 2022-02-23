import { useDispatch, useSelector } from 'react-redux';
import { setUser, unsetUser, fetchUser } from '../actions';

export const useUserState = () => {
    const store = useSelector(state => state);

    return store.user;
};

/**
 * Get user plan, or return true/false based on a plan name
 * @param {*} planName
 * @returns { plan model } | true | false
 */
export const usePlan = (planName) => {
    const plan = useSelector(state => state.user.user.memberships[0].plans);

    if (planName) {
        return plan.name.search(planName)
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
