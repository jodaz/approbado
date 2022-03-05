import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import EmptySchedule from './EmptySchedule'
import ScheduledTriviaCard from './ScheduledTriviaCard'

const Schedule = ({ isSmall }) => {
    if (isSmall) return null;

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
            <EmptySchedule />
            <ScheduledTriviaCard />
            <ScheduledTriviaCard />
        </Box>
    );
}

Schedule.propTypes = {
    isSmall: PropTypes.bool
}

export default Schedule
