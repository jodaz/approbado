import * as React from 'react'
import {
    TextInput,
    SelectInput,
    useNotify,
    ReferenceInput,
    useRefresh,
    FileInput
} from 'react-admin'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'

const ACCESS_TYPES = [
    { id: '0', name: 'Gratis' },
    { id: '1', name: 'De pago' }
]

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre.";
    }
    if (!values.category_id) {
        errors.category_id = "Seleccione una categoría.";
    }
    if (!values.level_id) {
        errors.level_id = "Seleccione un nivel.";
    }
    if (!values.is_free) {
        errors.is_free = "Seleccione un acceso.";
    }

    return errors;
};

const TriviaEdit = ({ record }) => {
    const notify = useNotify();
    const refresh = useRefresh()
    const [provider, { data, loaded, loading }] = useFileProvider(fileProvider);

    const save = React.useCallback(async values => {
        await provider({
            resource: 'trivias',
            type: 'update',
            payload: {
                id: record.id,
                data: values
            }
        });
    }, []);

    React.useEffect(() => {
        if (data && loaded) {
            notify('Se ha completado la actualización con éxito')
            refresh()
        }
    }, [data, loaded])

    return (
        <BaseForm save={save} validate={validate} loading={loading} record={record}>
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Nivel'>
                <ReferenceInput
                    source='level_id'
                    reference='configurations/levels'
                    fullWidth
                >
                    <SelectInput source="name" />
                </ReferenceInput>
            </InputContainer>
            <InputContainer labelName='Acceso'>
                <SelectInput
                    source="is_free"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
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
            <InputContainer labelName='Categoría'>
                <FileInput source="file">
                    <></>
                </FileInput>
            </InputContainer>
        </BaseForm>
    )
}

export default TriviaEdit
