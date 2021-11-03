import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider';
import OptionsCardMenu from '../components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import cardStyles from '@approbado/lib/styles/cardStyles'

const OptionsMenu = props => (
    <OptionsCardMenu>
        <DeleteButton
            basePath='awards'
            confirmColor='warning'
            confirmTitle='Eliminar premio'
            confirmContent={'¿Está seguro que desea eliminar este premio?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const TriviaCard = ({ data, id }) => {
    const classes = cardStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={
                    <Typography variant="h6">
                        {data.title}
                    </Typography>
                }
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.innerContent}>
                    <Typography variant="span" component="span">
                        {data.type}
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="span" component="span">
                        {data.points}
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
