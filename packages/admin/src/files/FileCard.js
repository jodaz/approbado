import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider';
import OptionsCardMenu from '../components/OptionsCardMenu';
import { Link } from 'react-router-dom';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import cardStyles from '@approbado/lib/styles/cardStyles'

const OptionsMenu = props => (
    <OptionsCardMenu>
        <DeleteButton
            basePath='files'
            confirmColor='warning'
            confirmTitle='Eliminar subtema'
            confirmContent={'¿Está seguro que desea eliminar este subtema?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const FileCard = ({ data, id }) => {
    const classes = cardStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.innerContent}>
                    <Typography variant="span" component="span">
                        PDF
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="span" component="span">
                        154 Kb
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

FileCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default FileCard
