import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core'
import EmptySchedule from './EmptySchedule'

const useStyles = makeStyles(theme => ({
    card: {
        padding: '1rem 0.4rem',
        display: 'flex'
    },
    username: {
        marginLeft: '0.2rem',
        fontWeight: '600',
        cursor: 'pointer',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    icon: {
        marginRight: '1rem',
        height: theme.spacing(6),
        width: theme.spacing(6)
    },
    description: {
        display: 'inherit',
        flexDirection: 'column',
    },
    contributionsCount: {
        display: 'inherit',
        marginTop: '0.25rem',
        color: theme.palette.info.light
    }
}))

const Schedule = ({ isSmall }) => {
    const classes = useStyles();

    if (isSmall) return null;

    return (
        <Box p='0 0 0 2rem' width='30%'>
            <Box sx={{ fontWeight: '700', fontSize: '1.5rem', width: '100%' }}>
                Agenda mensual
            </Box>
            <EmptySchedule />
        </Box>
    );
}

Schedule.propTypes = {
    isSmall: PropTypes.bool
}

export default Schedule
