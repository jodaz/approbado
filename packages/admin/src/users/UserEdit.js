import * as React from 'react'
import {
    BooleanInput,
    useNotify
} from 'react-admin'
import { Grid } from '@material-ui/core'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import CustomPasswordInput from './CustomPasswordInput'
import { useHistory, useParams } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'
import SelectInput from '@approbado/lib/components/SelectInput'
import Spinner from '@approbado/lib/components/Spinner'

const ACCESS_TYPES = [
    { id: 'Administrador', name: 'Administrador' },
    { id: 'Pagos', name: 'Pagos' },
    { id: 'Moderador', name: 'Moderador' }
]

const validate = (values) => {
  const errors = {};

  if (!values.names) {
    errors.name = "Ingrese el nombre.";
  }
  if (!values.email) {
    errors.email = "Ingrese un correo electronico.";
  }

  return errors;
};

const UserEdit = () => {
    const notify = useNotify();
    const history = useHistory()
    const { id } = useParams();
    const [record, setRecord] = React.useState({})

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.put(`/users/${record.id}`, values)

            if (data) {
                history.push('/users?tab=admins')
                notify('Se ha completado el registro con éxito', 'success');
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/users/${id}`);

        setRecord(data);
    }, []);

    React.useEffect(() => {
        fetchRecord()
    }, [])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validate}
            record={record}
            formName='Editar usuario'
            saveButtonLabel='Actualizar'
        >
            <InputContainer
                label='Nombres'
            >
                <TextInput
                    name="names"
                    placeholder="Nombres"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Correo electrónico'>
                <TextInput
                    label={false}
                    name="email"
                    placeholder="Correo electronico"
                    fullWidth
                />
            </InputContainer>
            <Grid item xs={12}>
                <BooleanInput
                    source="random_pass"
                    label="Generar contraseña y enviar por correo"
                />
            </Grid>
            <CustomPasswordInput />
            <InputContainer label='Tipo de acceso'>
                <SelectInput
                    label={false}
                    options={ACCESS_TYPES}
                    name='rol'
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

export default UserEdit
