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
import OptionsCardMenu from '../components/OptionsCardMenu';
import { Link } from 'react-router-dom';
import DeleteButton from '@approbado/lib/components/DeleteButton'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1em',
        radius: '8px',
        background: '#F9F9F9',
        '&:hover': {
            boxShadow: "4px 4px 90px 0px #00000014",
        },
    },
    cardHeader: {
        padding: '1em 1em 0 1em !important'
    },
    cardContent: {
        padding: '1em',
    },
    innerContent: {
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        width: '4px',
        borderRadius: '50%',
        background: theme.palette.text.primary,
        height: '4px',
        margin: '0 0.5em',
        '&::after': {
            content: '',
            position: 'absolute',
            width: '4px',
            height: '100%',
            background: '#fff',
            right: 0,
            left: 0,
            textAlign: 'center',
            margin: '0 auto',
            '-webkit-transform': 'rotate(-66deg)',
            '-moz-transform': 'rotate(-66deg)',
            '-o-transform': 'rotate(-66deg)',
            '-ms-transform': 'rotate(-66deg)',
            'transform': 'rotate(-66deg)',
        }
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        },
        '&visited': {
            color: theme.palette.primary.main,
        }
    },
}))


const OptionsMenu = props => (
    <OptionsCardMenu>
        <DeleteButton
            basePath='subthemes'
            confirmColor='warning'
            confirmTitle='Eliminar subtema'
            confirmContent={'¿Está seguro que desea eliminar este subtema?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const TriviaCard = ({ data, id }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={
                    <Link to={`subthemes/${data.id}/show`} className={classes.link}>
                        {data.title}
                    </Link>
                }
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.innerContent}>
                    <Typography variant="span" component="span">
                        20 preguntas
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="span" component="span">
                        5 archivos
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

TriviaCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default TriviaCard
