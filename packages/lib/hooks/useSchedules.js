import { useDispatch, useSelector } from 'react-redux';
import { FETCH_SCHEDULES, unsetSchedule } from '../actions';

export const useSchedulesState = () => {
    const store = useSelector(state => state);

    return store.schedules;
};

export const useSchedulesDispatch = () => {
    const dispatch = useDispatch();

    return {
        setSchedules: data => dispatch({
            type: FETCH_SCHEDULES,
            payload: data
        }),
        unsetSchedule: data => dispatch(unsetSchedule(data))
    }
}
