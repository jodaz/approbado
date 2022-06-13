import * as React from 'react'
import {
    useNotify,
    useRefresh
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import ImageInput from '@approbado/lib/components/ImageInput'
import Box from '@material-ui/core/Box'
import isEmpty from 'is-empty'
import TextInput from '@approbado/lib/components/TextInput'
import SelectCategoryInput from './SelectCategoryInput';
import SelectInput from '@approbado/lib/components/SelectInput'
import validate from './validateTrivias'
import SelectPlansInput from './SelectPlansInput'

const ACCESS_TYPES = [
    { id: '1', name: 'Gratis' },
    { id: '0', name: 'De pago' }
]

const TriviaEdit = ({ record }) => {
    const notify = useNotify();
    const refresh = useRefresh()
    const [provider, { data, loading }] = useFileProvider(fileProvider);

    const save = React.useCallback(async values => {
        try {
            const { plans, ...rest } = values
            await provider({
                resource: 'trivias',
                type: 'update',
                payload: {
                    id: record.id,
                    data: rest
                }
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider]);

    React.useEffect(() => {
        if (!isEmpty(data)) {
            notify('Se ha completado la actualización con éxito', 'success')
            refresh()
        }
    }, [data])

    return (
        <BaseForm save={save} validate={validate} loading={loading} record={record}>
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Acceso'>
                <SelectInput
                    name="is_free"
                    options={ACCESS_TYPES}
                />
            </InputContainer>
            <InputContainer label='Imagen de portada'>
                <Box marginTop='1rem'>
                    <ImageInput
                        source="file"
                        loading={loading}
                        accept='image/svg+xml,image/png'
                        preview={(record.cover) && `${process.env.REACT_APP_API_DOMAIN}/${record.cover}`}
                        hasPreview={!!record.cover}
                    />
                    <Box width='16rem'>
                        <Box fontSize='14px' fontWeight='400' color='#6D6D6D' margin='1rem 0'>
                            El ícono debe tener una dimensión de 312 x 178 píxeles. Formato PNG o SVG.
                        </Box>
                    </Box>
                </Box>
            </InputContainer>
            <SelectCategoryInput />
            <SelectPlansInput />
        </BaseForm>
    )
}

export default TriviaEdit
