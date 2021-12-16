import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import { useHistory } from 'react-router-dom';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '8px !important',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #D1D1D1',
        cursor: 'pointer',
        marginBottom: '2rem',
        padding: '1rem'
    },
    dot: {
        height: '5px',
        width: '5px',
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block',
        margin: '0.5rem'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    lightTypography: {
        fontSize: '0.9rem',
        fontWeight: 400,
        color: theme.palette.info.light,
    },
    primaryTypography: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    header: {
        padding: '0rem'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 3.5rem',
    }
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
    const dates = React.useState(() => {
        const ISODate = new Date(data.created_at.replace(' ', 'T'));
        const shortOptions = {
            month: 'long',
            day: 'numeric'
        }

        const shortDate = new Intl.DateTimeFormat('es-ES', shortOptions).format(ISODate)

        return shortDate
    })
    const classes = useStyles();
    const history = useHistory();

    const redirect = () => history.push(`/forums/${id}/show`)

    return (
        <Card className={classes.root} onClick={redirect}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={
                    <Typography component="div">
                        <Box className={classes.title} sx={{ fontSize: '1rem'}}>
                            {data.message}
                        </Box>
                    </Typography>
                }
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={`${process.env.REACT_APP_API_DOMAIN}/public/${data.owner.picture}`}
                    />
                }
                className={classes.header}
            />
            <CardContent className={classes.content}>
                <Typography variant="div">
                    <span className={classes.lightTypography}>
                    {'Por '}
                    </span>
                    <span className={classes.primaryTypography}>
                        {data.owner.names}
                    </span>
                    <span className={classes.dot}></span>
                    <span className={classes.lightTypography}>
                        {dates}
                    </span>
                    <span className={classes.dot}></span>
                    <span className={classes.lightTypography}>
                        {data.commentsCount} respuestas
                    </span>
                </Typography>
            </CardContent>
        </Card>
    );
}

ForumCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default ForumCard
