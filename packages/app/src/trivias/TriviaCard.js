import * as React from 'react';
import { makeStyles, fade } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types'
import cardStyles from '@approbado/lib/styles/cardStyles'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1em',
        cursor: 'pointer !important',
        borderRadius: '8px !important',
        background: '#F9F9F9',
        transition: '0.1s',
        '&:hover': {
            boxShadow: "4px 4px 90px 0px #00000014",
            border: `1px solid ${fade(theme.palette.secondary.main, 0.8)}`
        },
    },
    cardContent: {
        margin: '2em',
        textAlign: 'center'
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
    }
}))

const TriviaCard = ({ data, id }) => {
    const classes = { ...cardStyles(), ...useStyles() };

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">
                    {data.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

TriviaCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default TriviaCard
