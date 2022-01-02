import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        margin: '1rem 0',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 600,
        color: theme.palette.info.light
    },
    icon: {
        fontSize: '20px',
        width: '3rem',
        color: theme.palette.info.light
    },
    children: {
        marginTop: '0.5rem',
        lineHeight: '24px'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        paddingLeft: '3rem'
    }
}));

const ProfileContentItem = ({ title, icon, children }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                {React.cloneElement(icon, {
                    className: classes.icon
                })}
                <Typography className={classes.title}>
                    {title}
                </Typography>
            </Box>
            <Box className={classes.content}>
                <Typography component="div" className={classes.children}>
                    {React.cloneElement(children, {})}
                </Typography>
            </Box>
        </Box>
    );
}

ProfileContentItem.propTypes = {
    title: PropTypes.string,
    icon: React.ReactElement
}

export default ProfileContentItem;
