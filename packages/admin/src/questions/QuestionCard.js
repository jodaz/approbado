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

const OptionsMenu = props => (
    <OptionsCardMenu icon={<More />}>
        <DeleteButton
            basePath='questions'
            confirmColor='warning'
            confirmTitle='Eliminar pregunta'
            confirmContent={'¿Está seguro que desea eliminar esta pregunta?'}
            label={'Eliminar'}
            {...props}
        />
    </OptionsCardMenu>
);

const QuestionCard = ({ data, id }) => {
    const classes = cardStyles();

    return (
        <Card className={classes.root} key={id}>
            <CardHeader
                action={<OptionsMenu record={data} />}
                title={
                    <Typography variant="subtitle1" component="h1">
                        {`${id}. ${data.description}`}
                    </Typography>
                }
                subheader={
                    <Box marginTop='1rem'>
                        {data.options[0].statement}
                    </Box>
                }
            />
        </Card>
    );
}

QuestionCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default QuestionCard
