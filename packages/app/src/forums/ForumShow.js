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
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';

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

const ForumShowHeader = ({ record }) => {
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
                <Typography variant='subtitle1'>Forum</Typography>
            </CardContent>
        </Card>
    );
}

const ForumShow = props => {
    const showControllerProps = useShowController(props)

    const { record, loaded } = showControllerProps

    if (!loaded) return null;

    return (
        <React.Fragment>
            <ForumShowHeader record={record} />
        </React.Fragment>
    )
}

export default ForumShow;
