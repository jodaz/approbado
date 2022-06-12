import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import EmptySchedule from './EmptySchedule'
import ScheduledTriviaCard from './ScheduledTriviaCard'
import Spinner from '@approbado/lib/components/Spinner'
import { useSchedulesState, useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import useFetch from '@approbado/lib/hooks/useFetch'

const Schedule = ({ isSmall, user }) => {
    const data = useSchedulesState();
    const {
        loading,
        error,
        data: fetchedData
    } = useFetch(`/schedules/user/${user.id}`);
    const { setSchedules } = useSchedulesDispatch();

    React.useEffect(() => {
        if (fetchedData.length) {
            setSchedules(fetchedData);
        }
    }, [fetchedData])

    if (isSmall) return null;

    const renderer = () => (
        <>
            {(data.length)
            ? (
                <>
                    {data.map((schedule, key) => <ScheduledTriviaCard key={key} {...schedule} />)}
                </>
            ) : <EmptySchedule />}
        </>
    )

    return (
        <Box sx={{
            width: '30%',
            padding: '0 1rem'
        }}>
            <Box sx={{
                fontWeight: '700',
                fontSize: '1.5rem',
                width: '100%'
            }}>
                Agenda mensual
            </Box>
            {(loading) ? <Spinner /> : renderer()}
        </Box>
    );
}

Schedule.propTypes = {
    isSmall: PropTypes.bool
}

export default Schedule
