import * as React from 'react'
import {
    TextInput,
    SelectInput,
    useNotify,
    ReferenceInput,
    useRefresh,
    SelectArrayInput,
    ReferenceArrayInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import ImageInput from '@approbado/lib/components/ImageInput'
import Box from '@material-ui/core/Box'
import isEmpty from 'is-empty'
import { Field } from 'react-final-form';
import MultipleSelectTag from '@approbado/lib/components/MultipleSelectTag'
import { checkArray } from '@approbado/lib/utils/checkArray'

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
    if (!checkArray(values.plans)) {
        errors.plans = "Seleccione un plan.";
    }

    console.log(values)

    return errors;
};

const TriviaEdit = ({ record }) => {
    const notify = useNotify();
    const refresh = useRefresh()
    const [provider, { data, loading }] = useFileProvider(fileProvider);

    const save = React.useCallback(async values => {
        await provider({
            resource: 'trivias',
            type: 'update',
            payload: {
                id: record.id,
                data: values
            }
        });
    }, [provider]);

    React.useEffect(() => {
        if (!isEmpty(data)) {
            notify('Se ha completado la actualización con éxito', 'success')
            refresh()
        }
    }, [data])

    return (
        <BaseForm save={save} validate={validate} loading={loading} record={record}>
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Acceso'>
                <SelectInput
                    source="is_free"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Imagen de portada'>
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
            <InputContainer labelName='Categoría'>
                <ReferenceInput
                    source='category_id'
                    reference='configurations/categories'
                    fullWidth
                >
                    <SelectInput source="name" />
                </ReferenceInput>
            </InputContainer>
            <InputContainer labelName='Planes'>
                <ReferenceArrayInput
                    source='plans'
                    reference='memberships/plans'
                    allowEmpty
                    fullWidth
                >
                    <SelectArrayInput />
                </ReferenceArrayInput>
            </InputContainer>
        </BaseForm>
    )
}

export default TriviaEdit
