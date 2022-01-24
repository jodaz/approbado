import * as React from 'react';
import { makeStyles, fade } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'
import cardStyles from '@approbado/lib/styles/cardStyles'
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useTriviaDispatch, useTriviaState } from "@approbado/lib/hooks/useTriviaSelect"
import PadLockIcon from '@approbado/lib/icons/PadLock'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 1rem 1rem 0',
        cursor: 'pointer !important',
        borderRadius: '8px !important',
        background: '#F9F9F9',
        transition: '0.1s',
        '&:hover': {
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
            border: `3px solid ${fade(theme.palette.secondary.main, 0.8)}`
        },
        position: 'relative',
        '&::before': {
            content: "''",
            backgroundImage: props => (props.cover) ? `url(${process.env.REACT_APP_API_DOMAIN}/${props.cover})` : '',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100% 100%',
            position: 'absolute',
            width: '100%',
            height: '100%',
            right: '0px',
            bottom: '0px',
            zIndex: 0,
        },
        boxShadow: props => props.isSelected && "0px 1px 8px rgba(0, 0, 0, 0.12)",
        border: props => props.isSelected && `3px solid ${fade(theme.palette.secondary.main, 0.8)}`,
    },
    content: {
        textAlign: 'center',
        padding: '2rem 0'
    },
    blockedContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'content-max',
        height: 'content-max',
        padding: '0.5rem',
        background: 'transparent',
        zIndex: 1000,
        position: 'absolute',
        fontSize: '0.9rem',
        top: 0,
        left: 0,
        border: 'none',
        color: theme.palette.info.light
    },
    icon: {
        fontSize: 'inherit',
        marginRight: '0.25rem'
    }
}))

const TriviaCard = ({ data, id }) => {
    const { setTrivia } = useTriviaDispatch();
    const { trivia } = useTriviaState();
    const classes = {
        ...cardStyles(),
        ...useStyles({
            cover: data.cover,
            isSelected: data.id == trivia.id
        })
    };

    return (
        <Card className={classes.root} key={id}>
            <CardActionArea onClick={() => setTrivia(data)}>
                <Box className={classes.content}>
                    <Typography variant="h6">
                        {data.name}
                    </Typography>
                </Box>
            </CardActionArea>
            {(!data.is_free) && (
                <Box className={classes.blockedContent}>
                    <PadLockIcon className={classes.icon} /> Contenido bloqueado
                </Box>
            )}
        </Card>
    );
}

TriviaCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default TriviaCard
