import * as React from 'react';
import {
    useShowController
} from 'react-admin'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import BalanceIcon from '@approbado/lib/icons/BalanceIcon'
import OptionMenuItem from '../components/OptionMenuItem';
import OptionsCardMenu from '../components/OptionsCardMenu';
import TabbedList from '@approbado/lib/components/TabbedList'

import TriviaEdit from './TriviaEdit'
import SubthemesList from './Subthemes';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1em',
        borderRadius: '8px !important',
        background: '#F9F9F9',
        height: '8rem'
    },
    cardHeader: {
        padding: '1em !important'
    },
    cardContent: {
        padding: '1em',
        display: 'flex',
        justifyContent: 'space-between',
        width: '4rem',
        alignItems: 'center'
    }
}))

const OptionsMenu = () => (
    <OptionsCardMenu>
        <OptionMenuItem />
    </OptionsCardMenu>
);

const TriviaShowHeader = ({ name, id }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu />}
                title={name}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <BalanceIcon />
                <Typography variant='subtitle1'>Trivia</Typography>
            </CardContent>
        </Card>
    );
}

TriviaShowHeader.propTypes = {
    name: PropTypes.object,
    id: PropTypes.number
}

const tags = record => ([
    {
        name: 'Subtemas',
        pathname: 'subthemes',
        component: <SubthemesList {...record} />
    },
    {
        name: 'Archivos',
        pathname: 'files',
        component: <SubthemesList {...record} />
    },
    {
        name: 'Premios',
        pathname: 'awards',
        component: <SubthemesList {...record} />
    },
    {
        name: 'Preguntas',
        pathname: 'questions',
        component: <SubthemesList {...record} />
    },
    {
        name: 'General',
        pathname: 'general',
        component: <TriviaEdit {...record} />
    },
])

const TriviaShow = props => {
    const showControllerProps = useShowController(props)

    const { record } = showControllerProps

    return (
        <>
            <TriviaShowHeader {...record} />

            <TabbedList
                tags={tags(record)}
            />
        </>
    )
}

export default TriviaShow;
