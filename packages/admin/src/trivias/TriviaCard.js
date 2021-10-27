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
import OptionMenuItem from '../components/OptionMenuItem';
import OptionsCardMenu from '../components/OptionsCardMenu';
import { Link } from 'react-router-dom';

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
    tag: {
        display: 'flex',
        justifyContent: 'start',
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
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            cursor: 'pointer'
        },
        '&visited': {
            color: theme.palette.primary.main,
        }
    },
}))

const OptionsMenu = () => (
    <OptionsCardMenu>
        <OptionMenuItem />
    </OptionsCardMenu>
);

const TriviaCard = ({ data, id }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu />}
                title={
                    <Link to={`trivias/${data.id}/show`} className={classes.link}>
                        {data.name}
                    </Link>
                }
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.innerContent}>
                    <Typography variant="span" component="span">
                        4 subtemas
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="span" component="span">
                        5 archivos
                    </Typography>
                </div>
                <Box component='div' className={classes.tag}>
                    <LocalOfferIcon fontSize="small" />
                    <Typography variant="span" component="span" style={{ paddingLeft: '5px' }}>
                        Intermedio
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

TriviaCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default TriviaCard
