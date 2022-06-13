import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '8px !important',
        background: theme.palette.background.dark,
        minHeight: '8rem'
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
    },
    icon: {
        marginRight: '0.5rem'
    }
}))

const TriviaShowHeader = ({ record, icon, name, menu }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={menu}
                title={record.name}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                {React.cloneElement(icon, {
                    className: classes.icon
                })}
                <Typography variant='subtitle1'>{name}</Typography>
            </CardContent>
        </Card>
    );
}

export default TriviaShowHeader;
