import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import cardStyles from '@approbado/lib/styles/cardStyles'
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import Dot from '@approbado/lib/components/Dot';
import { useHistory } from 'react-router-dom'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<More />}>
        <DeleteButton
            basePath='subthemes'
            confirmColor='warning'
            confirmTitle='Eliminar subtema'
            confirmContent={'¿Está seguro que desea eliminar este subtema?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const SubthemeCard = ({ data, id }) => {
    const classes = cardStyles();
    const history = useHistory();

    const handleRedirect = () => history.push(`/trivias/${data.trivia_id}/subthemes/${data.id}/show`)

    return (
        <Card className={classes.root} key={id} onClick={handleRedirect}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={
                    <Typography variant="subtitle1" component="h1">
                        {`${id}. ${data.name}`}
                    </Typography>
                }
                subheader={
                    <Box display="flex" marginTop='1rem'>
                        <Typography variant="body2" component="span">
                            {data.questionsCount} preguntas
                        </Typography>
                        <Dot />
                        <Typography variant="body2" component="span">
                            {data.filesCount} archivos
                        </Typography>
                    </Box>
                }
            />
        </Card>
    );
}

SubthemeCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default SubthemeCard
