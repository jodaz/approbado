import * as React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import Dot from '@approbado/lib/components/Dot'
import { Link } from 'react-router-dom'
import { useUserState } from '@approbado/lib/hooks/useUserState'

const useStyles = makeStyles(theme => ({
    lightTypography: {
        fontSize: '0.9rem',
        fontWeight: 400,
        color: theme.palette.info.light,
    },
    primaryTypography: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    link: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}))

const redirectTo = (record, userId) => (
    (record.owner.id == userId) ? `/profile` : `/users/${record.owner.id}/show`
)

export default ({ record }) => {
    const { user } = useUserState();
    const dates = React.useState(() => {
        const ISODate = new Date(record.created_at.replace(' ', 'T'));
        const shortOptions = {
            month: 'long',
            day: 'numeric'
        }

        const shortDate = new Intl.DateTimeFormat('es-ES', shortOptions).format(ISODate)
        const year = new Intl.DateTimeFormat('es-ES', { year: 'numeric' }).format(ISODate)

        return `${shortDate}, ${year}`
    })
    const classes = useStyles();

    return (
        <Box component="div" sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
            <span className={classes.lightTypography}>
            Por &nbsp;
            </span>
            <Link
                className={classes.link}
                to={redirectTo(record, user.id)}
            >
                {record.owner.names}
            </Link>
            <Dot />
            <span className={classes.lightTypography}>
                {dates}
            </span>
            <Dot />
            <span className={classes.lightTypography}>
                {record.commentsCount} respuestas
            </span>
        </Box>
    );
}
