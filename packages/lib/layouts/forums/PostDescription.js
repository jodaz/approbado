import * as React from 'react';
import { makeStyles, Box, useMediaQuery  } from '@material-ui/core';
import Dot from '@approbado/lib/components/Dot'
import { Link } from 'react-router-dom'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import ItemCollection from '@approbado/lib/components/ItemCollection'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        height: '4rem'
    },
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
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    }
}))

const redirectTo = (record, userId) => (
    (record.owner.id == userId) ? `/profile` : `/users/${record.owner.id}/show`
)

export default ({ record }) => {
    const { categories } = record
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
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )

    return (
        <Box component="div" className={classes.root}>
            <Box className={classes.content}>
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
                {(!isXSmall) && (
                    <>
                    <Dot />
                    <span className={classes.lightTypography}>
                        {record.commentsCount} respuestas
                    </span>
                    </>
                )}
            </Box>
            <ItemCollection items={categories} />
        </Box>
    );
}
