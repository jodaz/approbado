import * as React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';

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
        fontWeight: 500,
        color: theme.palette.primary.main,
        margin: '6px 0',
        flexGrow: 1,
        lineHeight: '26px'
    },
    count: {
        paddingLeft: '1rem',
        textAlign: 'center',
        color: theme.palette.info.light,
    }
}));

const AnalyticsCard = ({ item, reportsCount }) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box className={classes.reason}>
                {item}
            </Box>
            <Box className={classes.count}>
                {reportsCount} reportes
            </Box>
        </Box>
    );
}

export default AnalyticsCard
