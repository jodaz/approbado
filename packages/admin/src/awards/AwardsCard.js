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
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import { ReactComponent as Certificate } from '@approbado/lib/icons/Certificate.svg'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<More />}>
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

const AwardCard = ({ data, id }) => {
    const classes = cardStyles();

    return (
        <Card className={classes.root} key={id}>
            <CardHeader
                avatar={
                    (data.type == 'Insignia') ? (
                        <Avatar
                            src={`${process.env.REACT_APP_API_DOMAIN}/${data.file}`}
                            alt='icon'
                        />
                    ) : (
                        <Certificate />
                    )
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

AwardCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default AwardCard
