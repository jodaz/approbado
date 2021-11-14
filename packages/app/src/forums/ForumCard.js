import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import cardStyles from '@approbado/lib/styles/cardStyles'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import { Link } from 'react-router-dom';
import DeleteButton from '@approbado/lib/components/DeleteButton'

const useStyles = makeStyles(theme => ({
    tag: {
        display: 'flex',
        backgroundColor: theme.palette.info.main,
        height: '2em',
        borderRadius: '6px',
        width: '8em',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.secondary.light,
        marginTop: '1em'
    },
    tagIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 0.8em'
    },
}));

const OptionsMenu = props => (
    <OptionsCardMenu>
        <DeleteButton
            basePath='forums'
            confirmColor='warning'
            confirmTitle='Eliminar foro'
            confirmContent={'¿Está seguro que desea eliminar esta foro?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const ForumCard = ({ data, id }) => {
    const classes = { ...cardStyles(), ...useStyles() };

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={
                    <Link to={`forums/${data.id}/show`} className={classes.link}>
                        {data.title}
                    </Link>
                }
                className={classes.cardHeader}
            />
        </Card>
    );
}

ForumCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default ForumCard
