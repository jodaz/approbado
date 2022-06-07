import * as React from 'react'
import {
    SelectInput,
    useNotify,
    ReferenceInput,
    useRefresh,
    ReferenceArrayInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import ImageInput from '@approbado/lib/components/ImageInput'
import Box from '@material-ui/core/Box'
import isEmpty from 'is-empty'
import MultipleSelectTag from '@approbado/lib/components/MultipleSelectTag'
import TextInput from '@approbado/lib/components/TextInput'

const ACCESS_TYPES = [
    { id: '1', name: 'Gratis' },
    { id: '0', name: 'De pago' }
]

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    }
    if (!values.category_id) {
        errors.category_id = "Seleccione una categoría.";
    }
    if (!values.is_free) {
        errors.is_free = "Seleccione un acceso.";
    }
    if (values.plans_ids) {
        errors.plans_ids = "Seleccione un plan.";
    }

    return errors;
};

const TriviaEdit = ({ record }) => {
    const notify = useNotify();
    const refresh = useRefresh()
    const [provider, { data, loading }] = useFileProvider(fileProvider);

    const save = React.useCallback(async values => {
        try {
            await provider({
                resource: 'trivias',
                type: 'update',
                payload: {
                    id: record.id,
                    data: values
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
                    source="is_free"
                    choices={ACCESS_TYPES}
                    fullWidth
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
            <InputContainer label='Categoría'>
                <ReferenceInput
                    source='category_id'
                    reference='configurations/categories'
                    fullWidth
                >
                    <SelectInput source="name" />
                </ReferenceInput>
            </InputContainer>
            <InputContainer label='Planes'>
                <ReferenceArrayInput
                    source='plans_ids'
                    reference='memberships/plans'
                    allowEmpty
                    fullWidth
                >
                    <MultipleSelectTag />
                </ReferenceArrayInput>
            </InputContainer>
        </BaseForm>
    )
}

export default TriviaEdit
