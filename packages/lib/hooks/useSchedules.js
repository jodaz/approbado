import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../actions';

export const useSchedulesState = name => {
    const store = useSelector(state => state);

    return store.schedules;
};

export const useSchedulesDispatch = () => {
    const dispatch = useDispatch();

    return {
        setData: data => dispatch(fetchSchedules(data))
    }
}
