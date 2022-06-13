import * as React from 'react'
import { alpha } from '@material-ui/core'
import styled from '@material-ui/styles/styled';
import { useMutation, useNotify } from 'react-admin'
import Button from '@material-ui/core/Button';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useHistory } from 'react-router-dom'

const CustomizedButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    border: '1px solid #B7B7B7 !important',
    '&:hover': {
        backgroundColor: alpha(theme.palette.background.dark, 0.9)
    }
}));

const DeleteReportButton = ({ id, owner: user }) => {
    const history = useHistory();
    const notify = useNotify()
    const [open, setOpen] = React.useState(false);
    const [mutate, { loaded, loading }] = useMutation();

    const handleClick = React.useCallback(async () => {
        try {
            await mutate({
                type: 'create',
                resource: 'blacklisted-users',
                payload: { data: { user_id: user.id, is_restricted: false } }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate, user])

    React.useEffect(() => {
        if (loaded) {
            history.push(`/reports/${id}/show`)
            notify(`¡El usuario @${user.user_name} ahora está en la lista negra!`, 'success')
        }
    }, [loaded])

    return (
        <>
            <CustomizedButton size='large' onClick={() => setOpen(!open)}>
                Colocar en lista negra
            </CustomizedButton>
            <Confirm
                isOpen={open}
                loading={loading}
                title='Colocar usuario en lista negra'
                content={`¿Está seguro que desea colocar a ${user.user_name} en la lista negra?`}
                onConfirm={handleClick}
                onClose={() => setOpen(!open)}
                confirmColor='primary'
                confirm='Enlistar'
            />
        </>
    )
}

export default DeleteReportButton
