import * as React from 'react'
import {
    TextInput,
    useRedirect,
    useNotify,
    NumberInput,
    SelectInput
} from 'react-admin'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useFileProvider } from '@jodaz_/file-provider'
import { fileProvider } from '@approbado/lib/providers'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import { useFormState } from 'react-final-form'
import ImageInput from '@approbado/lib/components/ImageInput'
import Box from '@material-ui/core/Box'
import isEmpty from 'is-empty'

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = "Ingrese el nombre.";
    }
    if (!values.min_points) {
        errors.min_points = "Ingrese los puntos.";
    }

    return errors;
};

const ACCESS_TYPES = [
    { id: 'Insignia', name: 'Insignia' },
    { id: 'Certificado', name: 'Certificado' }
]

const FileInput = ({ loading }) => {
    const { values } = useFormState();

    if (!values.type) return null;

    return (
        <InputContainer labelName={values.type} md='12'>
            {(values.type == 'Certificado') ? (
                <Box marginTop='1rem'>
                    <UploadFileButton
                        source="file"
                        loading={loading}
                        accept="application/pdf"
                    />
                </Box>
            ) : (
                <Box marginTop='1rem'>
                    <ImageInput
                        source="file"
                        loading={loading}
                        accept='image/svg+xml,image/png'
                    />
                    <Box width='16rem'>
                        <Box fontSize='14px' fontWeight='400' color='#6D6D6D' margin='1rem 0'>
                            El ícono debe tener una dimensión de 500 x 500 píxeles. Formato PNG o SVG.
                        </Box>
                    </Box>
                </Box>
            )}
        </InputContainer>
    )
}

const AwardsCreate = () => {
    const { trivia_id } = useParams()
    const [provider, { data, loading, loaded }] = useFileProvider(fileProvider);
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, ...values };

        try {
            await provider({
                resource: 'awards',
                type: 'create',
                payload: data
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider, trivia_id])

    React.useEffect(() => {
        if (!isEmpty(data)) {
            notify('¡Has creado un nuevo premio!', 'success')
            redirect(`/trivias/${trivia_id}/show?tab=awards`)
        }
    }, [data, loaded])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear premio'
            loading={loading}
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Ingresa los puntos'>
                <NumberInput
                    source="min_points"
                    placeholder="Ingresa los puntos"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Tipo de premio'>
                <SelectInput
                    source="type"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <FileInput />
        </BaseForm>
    )
}

export default AwardsCreate
