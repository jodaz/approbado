import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/styles/makeStyles'
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { useLocation, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexDirection: 'column',
        minHeight: '15rem'
    },
    boxLayoutStyles: {
        margin: '0 !important',
    },
    tabs: {
        backgroundColor: 'transparent',
        color: fade(`${theme.palette.primary.dark}`, 0.8)
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
        paddingTop: '3rem',
        minHeight: '15rem'
    }
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function pathnameInPathnames(tags, pathname) {
    return tags.map(({ pathname }) => pathname).includes(pathname)
}

const TabbedList = ({
    tags,
    name,
    children
}) => {
    let query = useQuery();
    const [currentTab, setCurrentTab] = React.useState(() => (
        query.get('tab')
        ? (pathnameInPathnames(tags, query.get('tab')) ? query.get('tab') : null)
        : tags[0].pathname
    ));
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const tabPath = (tabname) => (
        `${window.location.pathname}?tab=${tabname}`
    )

    const componentToRender = () => {
        const tag = tags.filter(tag => tag.pathname === currentTab)
        const { component } = tag[0];

        return component
    }

    if (currentTab == null) return null

    return (
        <Box component='div' className={classes.root}>
            {name && <Typography component='h1' variant='h5'>{name}</Typography>}
            <Box component='div' paddingTop='1rem'>
                <Box>
                    <Tabs
                        value={currentTab}
                        indicatorColor="primary"
                        onChange={handleChange}
                        className={classes.tabs}
                    >
                        {
                            tags.map(tag => (
                                <Tab
                                    key={tag.pathname}
                                    label={tag.name}
                                    value={tag.pathname}
                                    className={classes.tab}
                                    component={Link}
                                    to={tabPath(tag.pathname)}
                                />
                            ))
                        }
                    </Tabs>
                    { children && React.cloneElement(children, {})}
                </Box>
                <Divider />
                <Box component='div' className={classes.content}>
                    {React.cloneElement(componentToRender(), {})}
                </Box>
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
