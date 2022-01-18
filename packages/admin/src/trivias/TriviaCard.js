import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider';
import cardStyles from '@approbado/lib/styles/cardStyles'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import { useHistory } from 'react-router-dom'

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
            basePath='trivias'
            confirmColor='warning'
            confirmTitle='Eliminar trivia'
            confirmContent={'¿Está seguro que desea eliminar esta trivia?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const TriviaCard = ({ data, id }) => {
    const classes = { ...cardStyles(), ...useStyles() };
    const history = useHistory();

    const handleRedirect = () => history.push(`/trivias/${id}/show`)

    return (
        <Card className={classes.root} onClick={handleRedirect}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={data.name}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.innerContent}>
                    <Typography variant="span" component="span">
                        {data.subthemesCount} subtemas
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="span" component="span">
                        {data.filesCount} archivos
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
