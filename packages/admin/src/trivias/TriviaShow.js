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
import NothingYet from '../components/NothingYet'
import SubthemesList from '../subthemes/SubthemesList'
import AwardsList from '../awards/AwardsList'
import FilesList from '../files/FilesList'

const useStyles = makeStyles(() => ({
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

const TriviaShowHeader = ({ record }) => {
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
        component: <SubthemesList record={record} />
    },
    {
        name: 'Archivos',
        pathname: 'files',
        component: <FilesList record={record} />
    },
    {
        name: 'Premios',
        pathname: 'awards',
        component: <AwardsList record={record} />
    },
    {
        name: 'Preguntas',
        pathname: 'questions',
        component: <NothingYet record={record} />
    },
    {
        name: 'General',
        pathname: 'general',
        component: <TriviaEdit record={record} />
    },
])

const TriviaShow = props => {
    const showControllerProps = useShowController(props)

    const { record, loaded } = showControllerProps

    if (!loaded) return null;

    return (
        <React.Fragment>
            <TriviaShowHeader record={record} />

            <TabbedList
                tags={tags(record)}
            />
        </React.Fragment>
    )
}

export default TriviaShow;
