import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import cardStyles from '@approbado/lib/styles/cardStyles'
import Avatar from '@material-ui/core/Avatar';
import Dot from '@approbado/lib/components/Dot';

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
                avatar={
                    <Avatar
                        src={`${process.env.REACT_APP_API_DOMAIN}/${data.icon}`}
                        alt='icon'
                    />
                }
                action={<OptionsMenu record={data} />}
                title={
                    <Typography variant="subtitle1" component="h1">
                        {data.title}
                    </Typography>
                }
                subheader={
                    <Box display="flex">
                        <Typography variant="body2">{data.type}</Typography>
                        <Dot />
                        <Typography variant="body2">{data.min_points} puntos</Typography>
                    </Box>
                }
            />
        </Card>
    );
}

TriviaCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default TriviaCard
