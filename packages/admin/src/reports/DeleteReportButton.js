import * as React from 'react'
import { alpha } from '@material-ui/core'
import styled from '@material-ui/styles/styled';
import { useMutation, useNotify } from 'react-admin'
import Button from '@material-ui/core/Button';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useHistory } from 'react-router-dom'

const CustomizedButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    marginLeft: '1rem',
    '&:hover': {
        backgroundColor: alpha(theme.palette.error.main, 0.9)
    }
}));

const DeleteReportButton = ({ id }) => {
    const history = useHistory();
    const notify = useNotify()
    const [open, setOpen] = React.useState(false);
    const [handleDelete, { loaded, loading }] = useMutation({
        type: 'delete',
        resource: 'forums',
        payload: { id: id }
    });

    React.useEffect(() => {
        if (loaded) {
            history.push('/reports')
            notify('¡La publicación ha sido eliminada!', 'success')
        }
    }, [loaded])

    return (
        <>
            <CustomizedButton size='large' onClick={() => setOpen(!open)}>
                Eliminar publicacion
            </CustomizedButton>
            <Confirm
                isOpen={open}
                loading={loading}
                title='Eliminar reporte'
                content='¿Está seguro que desea eliminar la publicación?'
                onConfirm={handleDelete}
                onClose={() => setOpen(!open)}
                confirmColor='primary'
            />
        </>
    )
}

export default DeleteReportButton
