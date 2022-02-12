import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import makeStyles from '@material-ui/styles/makeStyles';
import DeleteButton from '@approbado/lib/components/DeleteButton'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<More />}>
        <DeleteButton
            basePath='blacklisted-users'
            confirmColor='warning'
            confirmTitle='Quitar restricción'
            confirmContent={'¿Está seguro que quitar la restricción al usuario?'}
            label='Quitar restricción'
            {...props}
        />
    </OptionsCardMenu>
);


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        backgroundColor: theme.palette.background.dark,
        borderRadius: '8px !important',
        padding: '1rem',
        flexDirection: 'column'
    },
    card: {
        background: theme.palette.background.dark,
        border: 'none',
        height: 'content-height',
        alignItems: 'start',
        padding: '0.5rem 1rem 1rem 1rem'
    },
    headerRoot: {
        padding: '0 !important',
        height: '3rem',
        alignItems: 'start',
    },
    content: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    action: {
        margin: 'unset'
    }
}))

const RestrictedUserCard = ({ data, id }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleRedirect = () => history.push(`/users/${id}/show`)

    return (
        <Card className={classes.root} key={id} onClick={handleRedirect}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                className={classes.cardHeader}
                title={
                    <Typography variant="subtitle1">
                        {data.names}
                    </Typography>
                }
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={`${configs.SOURCE}/${data.picture}`}
                    />
                }
                subheader={
                    <Box display="flex" alignItems='center'>
                        <Typography variant="subtitle1">
                            {data.user_name}
                        </Typography>
                    </Box>
                }
                classes={{
                    root: classes.headerRoot,
                    content: classes.content,
                    action: classes.action
                }}
            />
        </Card>
    );
}

RestrictedUserCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default RestrictedUserCard
