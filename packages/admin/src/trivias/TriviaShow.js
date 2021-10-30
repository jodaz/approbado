import * as React from 'react';
import {
    useRedirect,
    useShowController
} from 'react-admin'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BalanceIcon from '@approbado/lib/icons/BalanceIcon'
import DeleteButton from '@approbado/lib/components/DeleteButton'
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

const OptionsMenu = props => {
    const redirect = useRedirect();

    return (
        <OptionsCardMenu>
            <DeleteButton
                basePath='trivias'
                confirmColor='warning'
                confirmTitle='Eliminar trivia'
                confirmContent={'¿Está seguro que desea eliminar esta trivia?'}
                label={'Eliminar'}
                customAction={() => redirect('/trivias')}
                {...props}
            />
        </OptionsCardMenu>
    )
};

const TriviaShowHeader = record => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu record={record} />}
                title={record.name}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <BalanceIcon />
                <Typography variant='subtitle1'>Trivia</Typography>
            </CardContent>
        </Card>
    );
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
