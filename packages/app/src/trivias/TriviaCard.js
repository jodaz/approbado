import * as React from 'react';
import { makeStyles, fade } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types'
import cardStyles from '@approbado/lib/styles/cardStyles'
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useTriviaDispatch } from "@approbado/lib/hooks/useTriviaSelect"

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1em',
        cursor: 'pointer !important',
        borderRadius: '8px !important',
        background: '#F9F9F9',
        transition: '0.1s',
        '&:hover': {
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
            border: `3px solid ${fade(theme.palette.secondary.main, 0.8)}`
        },
        '&:focus': {
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
            border: `3px solid ${fade(theme.palette.secondary.main, 0.8)}`
        },
    },
    cardContent: {
        margin: '1em',
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
    const { setTrivia } = useTriviaDispatch();
    const classes = { ...cardStyles(), ...useStyles() };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => setTrivia(data)}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6">
                        {data.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

TriviaCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default TriviaCard
