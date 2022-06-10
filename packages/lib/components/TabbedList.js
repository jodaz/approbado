import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import makeStyles from '@material-ui/styles/makeStyles'
import PropTypes from 'prop-types';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { useLocation, Route, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '8rem',
        width: '100%'
    },
    boxLayoutStyles: {
        margin: '0 !important',
    },
    tabs: {
        backgroundColor: 'transparent',
        color: alpha(`${theme.palette.primary.dark}`, 0.8)
    },
    tab: {
        textTransform: 'none',
        fontWeight: '700',
        lineHeight: '20px',
        fontSize: '14px',
        letterSpacing: '0.3px',
        borderBottom: `2px solid ${theme.palette.primary.light}`,
        '&[aria-selected=true]': {
            color: `${theme.palette.info.main} !important`,
            borderBottom: `3px solid ${theme.palette.info.main}`
        }
    },
    content: {
        minHeight: '10rem',
        paddingTop: '2rem',
        height: '100%'
    },
    header: {
        paddingTop: '1rem',
        maxWidth: `calc(100vw - 2rem)`
    }
}));

const TabbedList = ({
    tags,
    name,
    children
}) => {
    const location = useLocation();
    const [currentTab, setCurrentTab] = React.useState(location.pathname);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    if (currentTab == null) return null

    return (
        <Box component='div' className={classes.root}>
            {name && <Typography component='h1' variant='h5'>{name}</Typography>}
            <Box component='div' className={classes.header}>
                <Route
                    path="/"
                    render={() => (
                        <Tabs
                            value={currentTab}
                            indicatorColor="primary"
                            onChange={handleChange}
                            className={classes.tabs}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            {
                                tags.map(tag => (
                                    <Tab
                                        key={tag.pathname}
                                        label={tag.name}
                                        value={tag.pathname}
                                        className={classes.tab}
                                        component={Link}
                                        to={tag.pathname}
                                    />
                                ))
                            }
                        </Tabs>
                    )}
                />
                { children && React.cloneElement(children, {})}
            </Box>
        </Box>
    )
}

TabbedList.propTypes = {
    children: PropTypes.node,
    tags: PropTypes.array,
    defaultTag: PropTypes.string,
    name: PropTypes.string
};

export default TabbedList
