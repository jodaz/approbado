import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import Divider from '@material-ui/core/Divider';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import cardStyles from '@approbado/lib/styles/cardStyles'

const OptionsMenu = props => (
    <OptionsCardMenu>
        <DeleteButton
            basePath='memberships/plans'
            confirmColor='warning'
            confirmTitle='Eliminar plan'
            confirmContent={'¿Está seguro que desea eliminar este plan?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const MembershipCard = ({ data, id }) => {
    const classes = cardStyles();

    return (
        <Card style={{ margin: '1em', radius: '8px', background: '#F9F9F9' }}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={data.name}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.innerContent}>
                    <Typography variant="span" component="span">
                        {data.amount}$ Mes
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="span" component="span">
                        {data.triviasCount} trivias
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

MembershipCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default MembershipCard
