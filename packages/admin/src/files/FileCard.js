import * as React from 'react';
import Card from '@material-ui/core/Card';
import configs from '@approbado/lib/configs'
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import cardStyles from '@approbado/lib/styles/cardStyles'
import { ReactComponent as Subtract } from '@approbado/lib/icons/Subtract.svg'
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import Link from '@material-ui/core/Link'

const OptionsMenu = props => (
    <OptionsCardMenu icon={<More />}>
        <DeleteButton
            basePath='files'
            confirmColor='warning'
            confirmTitle='Eliminar archivo'
            confirmContent={'¿Está seguro que desea eliminar este archivo?'}
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
                avatar={<Subtract />}
                action={<OptionsMenu record={data} />}
                title={
                    <Link
                        href={`${configs.SOURCE}/${data.file}`}
                        underline="hover"
                        target="_blank"
                        color="primary"
                    >
                        {data.title}
                    </Link>
                }
                subheader={data.size}
            />
        </Card>
    );
}

FileCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default FileCard
