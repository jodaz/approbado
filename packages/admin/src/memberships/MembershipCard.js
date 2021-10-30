import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import Divider from '@material-ui/core/Divider';
import OptionsCardMenu from '../components/OptionsCardMenu';

const useStyles = makeStyles(theme => ({
    cardHeader: {
        padding: '1em 1em 0 1em !important'
    },
    cardContent: {
        padding: '1em',
    },
    innerContent: {
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        width: '4px',
        borderRadius: '50%',
        background: theme.palette.text.primary,
        height: '4px',
        margin: '0 0.5em',
        '&::after': {
            content: '',
            position: 'absolute',
            width: '4px',
            height: '100%',
            background: '#fff',
            right: 0,
            left: 0,
            textAlign: 'center',
            margin: '0 auto',
            '-webkit-transform': 'rotate(-66deg)',
            '-moz-transform': 'rotate(-66deg)',
            '-o-transform': 'rotate(-66deg)',
            '-ms-transform': 'rotate(-66deg)',
            'transform': 'rotate(-66deg)',
        }
    },
    tag: {
        display: 'flex',
        justifyContent: 'start',
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
    }
}))

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
    const classes = useStyles();

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
                        5 trivias
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
