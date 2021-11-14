import * as React from 'react';
import {
    useRedirect,
    useShowController
} from 'react-admin'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LayerIcon from '@approbado/lib/icons/LayerIcon'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import SubthemeEdit from './SubthemeEdit'
import TabbedList from '@approbado/lib/components/TabbedList'

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
    const { trivia_id } = props;

    return (
        <OptionsCardMenu>
            <DeleteButton
                basePath='subthemes'
                confirmColor='warning'
                confirmTitle='Eliminar subtema'
                confirmContent={'¿Está seguro que desea eliminar este subtema?'}
                label={'Eliminar'}
                customAction={() => redirect(`/trivias/${trivia_id}/show`)}
                {...props}
            />
        </OptionsCardMenu>
    )
};

const SubthemeShowHeader = ({ record, trivia_id }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu record={record} trivia_id={trivia_id} />}
                title={record.title}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <LayerIcon />
                <Typography variant='subtitle1'>Subtema</Typography>
            </CardContent>
        </Card>
    );
}

const tags = record => ([
    {
        name: 'General',
        pathname: 'general',
        component: <SubthemeEdit record={record} />
    },
])

const SubthemeShow = () => {
    const { subtheme_id, trivia_id } = useParams();
    const showControllerProps = useShowController({
        basePath: 'subthemes',
        resource: 'subthemes',
        id: subtheme_id
    })

    const { record, loaded } = showControllerProps

    if (!loaded) return null;

    return (
        <React.Fragment>
            <SubthemeShowHeader record={record} trivia_id={trivia_id} />

            <TabbedList
                tags={tags(record)}
            />
        </React.Fragment>
    )
}

export default SubthemeShow;
