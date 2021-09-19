import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    root: {
        flexDirection: 'column',
    },
    boxLayoutStyles: {
        margin: '0 !important',
    },
    tabs: {
        backgroundColor: 'transparent',
        color: theme.palette.primary.light
    },
    tab: {
        textTransform: 'capitalize',
        fontWeight: '500',
        borderBottom: `2px solid ${theme.palette.primary.light}`,
        '&[aria-selected=true]': {
            color: theme.palette.info.main
        }
    }
}));

const TabbedList = ({
    tags,
    defaultTag,
    name,
    children
}) => {
    const [currentTab, setCurrentTab] = React.useState(defaultTag);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box component='div' className={classes.root}>
            <Typography component='h1' variant='h5'>{name}</Typography>
            <Box component='div' paddingTop='1rem'>
                <Tabs
                    value={currentTab}
                    indicatorColor="primary"
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    {
                        tags.map(choice => (
                            <Tab
                                key={choice}
                                label={choice}
                                value={choice}
                                className={classes.tab}
                            />
                        ))
                    }
                </Tabs>
                <Divider />
                <Box component='div' paddingTop='2rem'>
                    {React.cloneElement(children, {
                        currentTab: currentTab
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default TabbedList
