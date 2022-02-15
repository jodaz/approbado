import * as React from 'react'
import {
    TextInput,
    useMutation,
    NumberInput,
    ReferenceArrayInput,
    useRedirect,
    useEditController,
    SelectInput
} from 'react-admin'
import { validatePlan } from './plansValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import MultipleSelectTag from '@approbado/lib/components/MultipleSelectTag';
import { useParams } from 'react-router-dom'

const ACCESS_TYPES = [
    { id: '1', name: 'Permitido' },
    { id: '0', name: 'Denegado' }
]

const PlanEdit = props => {
    const { id } = useParams();
    const editControllerProps = useEditController({
        ...props,
        id: id
    });
    const [mutate, { data, loading }] = useMutation();
    const redirect = useRedirect()

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'update',
                resource: props.resource,
                payload: { id: record.id, data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    React.useEffect(() => {
        if (data) {
            return () => redirect('/configurations')
        }
    }, [data, redirect])

    const { record, loading: loadingRecord } = editControllerProps;

    if (loadingRecord) return null

    return (
        <BaseForm
            save={save}
            validate={validatePlan}
            formName='Crear membresía'
            record={record}
            loading={loading}
        >
            <InputContainer labelName='Nombre'>
                <TextInput
                    source="name"
                    placeholder="Ingresa el nombre de la membresía"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Monto'>
                <NumberInput
                    source="amount"
                    placeholder="Ingresa el precio de la membresía"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Trivias grupales gratis'>
                <NumberInput
                    source="trivias_in_teams"
                    placeholder="Cantidad"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Duración de la membresía'>
                <NumberInput
                    source="duration"
                    placeholder="Duración en meses"
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Acceso al foro'>
                <SelectInput
                    source="forum_access"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <InputContainer labelName='Trivias' xs='12' sm='12' md='12'>
                <ReferenceArrayInput
                    source="trivia_ids"
                    reference="trivias"
                    fullWidth
                >
                    <MultipleSelectTag value={record.trivias} />
                </ReferenceArrayInput>
            </InputContainer>
        </BaseForm>
    )
}

PlanEdit.defaultProps = {
    basePath: '/memberships/plans',
    resource: 'memberships/plans'
}

export default PlanEdit
