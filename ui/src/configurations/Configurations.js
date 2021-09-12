import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/styles/makeStyles'
// Components
import LevelsList from './LevelsList'
import CategoriesList from './CategoryList'
import TriviaSettings from './TriviaSettings'

const useStyles = makeStyles(() => ({
    root: {
        flexDirection: 'column',
    },
    boxLayoutStyles: {
        margin: '0 !important',
    },
    tabs: {
        backgroundColor: 'transparent',
        color: '#283436',
    },
    tab: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        '&active': {
            borderBottom: '5px solid blue'
        }
    }
}));

const tags = ['categorías', 'niveles', 'trivia'];

const Module = ({ currentTab }) => {
    if (currentTab === 'niveles') {
        return <LevelsList />
    } else if (currentTab === 'trivia') {
        return <TriviaSettings />
    } else if (currentTab === 'categorías') {
        return <CategoriesList />
    }
    return null;
}

const Configurations = () => {
    const [currentTab, setCurrentTab] = React.useState('categorías');
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Grid container className={classes.root}>
            <Typography component='h1' variant='h5'>Configuraciones</Typography>
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
            <Module currentTab={currentTab} />
        </Grid>
    )
}

export default Configurations
