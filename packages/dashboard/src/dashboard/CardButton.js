import * as React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    CircularProgress,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        border: '0',
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        justifyContent: 'center',
        height: 120,
        [theme.breakpoints.up('sm')]: {
            height: 175
        }
    },
    content: {
        display: 'inherit',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2em 0',
        flexDirection: 'column'
    },
    link: {
        '&:visited': {
            color: theme.palette.primary.dark,
            textDecoration: 'underline'
        }
    }
}));

const CardButton = ({ loading, total, title, linkText, link }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
            { (loading)
                ? <CircularProgress />
                : <>
                    <Typography variant="h6" color="textPrimary">
                        {title}
                    </Typography>
                    <Typography component="h3" variant="h3">
                        {total}
                    </Typography>
                    <Link to={link} className={classes.link}>
                        {linkText}
                    </Link>
                </>
            }
            </CardContent>
        </Card>
    );
}

CardButton.propTypes = {
    linkText: PropTypes.string,
    title: PropTypes.string,
    total: PropTypes.string,
    loading: PropTypes.bool
}

CardButton.defaultProps = {
    title: 'Titulo',
    loading: true,
    total: 0,
    linkText: 'link',
    link: '/'
};

export default CardButton
