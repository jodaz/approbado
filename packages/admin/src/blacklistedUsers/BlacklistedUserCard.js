import * as React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import Link from '@material-ui/core/Link';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '8px !important',
        padding: '8px 9px 16px 16px',
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '16rem'
    },
    reason: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main,
        margin: '6px 0',
        flexGrow: 1,
        lineHeight: '26px',
        display: 'flex'
    },
    count: {
        paddingLeft: '1rem',
        textAlign: 'center',
        color: theme.palette.info.light,
    }
}));

const BlacklistedUserCard = ({ data }) => {
    const { id, names, picture, usersReportsCount } = data
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box className={classes.reason}>
                <Avatar
                    aria-label="recipe"
                    src={`${configs.SOURCE}/${picture}`}
                />
                <Box display="flex" flexDirection="column">
                    <Box component="span">{names}</Box>
                    <Link
                        to={`/reports/users/${id}/show`}
                        color='info'
                        underline='hover'
                        component={LinkBehavior}
                    >
                        Ver publicaciones
                    </Link>
                </Box>
            </Box>
            <Box className={classes.count}>
                {usersReportsCount}<br />reportes
            </Box>
        </Box>
    );
}

export default BlacklistedUserCard
