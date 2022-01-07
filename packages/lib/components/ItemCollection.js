import * as React from 'react';
import { makeStyles, Box, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row'
    },
    item: {
        color: theme.palette.info.main,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '4px 8px',
        backgroundColor: fade(theme.palette.info.main, 0.12),
        borderRadius: '6px',
        marginRight: '0.5rem',
        fontSize: '14px',
        fontWeight: '600',
        width: 'max-content'
    }
}))

export default ({ items }) => {
    const classes = useStyles();

    return (
        <Box display="flex" className={classes.root}>
            {items.map((item, i) => (
                <Box key={i} className={classes.item}>{item.name}</Box>
            ))}
        </Box>
    );
}
