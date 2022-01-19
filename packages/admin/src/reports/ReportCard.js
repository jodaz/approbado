import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import cardStyles from '@approbado/lib/styles/cardStyles'
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import Typography from '@material-ui/core/Typography';
import Dot from '@approbado/lib/components/Dot';
import Box from '@material-ui/core/Box';
import Tag from '@approbado/lib/components/Tag';
import { ReactComponent as TagIcon } from '@approbado/lib/icons/Tag.svg'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import { useHistory } from 'react-router-dom'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<More />}>
        <DeleteButton
            basePath='reports'
            confirmColor='warning'
            confirmTitle='Eliminar reporte'
            confirmContent={'¿Está seguro que desea eliminar este reporte?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const ReportCard = ({ data, id }) => {
    const classes = cardStyles();
    const history = useHistory();

    const handleRedirect = () => history.push(`/reports/1/show`)

    return (
        <Card className={classes.root} key={id} onClick={handleRedirect}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                className={classes.cardHeader}
                title={
                    <Typography variant="subtitle1">
                        ¿Por qué los estudiantes de derecho son imbéciles?
                    </Typography>
                }
                subheader={
                    <Box display="flex" alignItems='center'>
                        <Typography variant="subtitle1">
                            @andresitosua
                        </Typography>
                        <Dot />
                        <Typography variant="subtitle1">
                            Reportado 5 veces
                        </Typography>
                    </Box>
                }
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Tag name='Foros' icon={<TagIcon />} />
                    <Typography variant="body2" component="span">
                        15, Jul 2021
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

ReportCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default ReportCard
