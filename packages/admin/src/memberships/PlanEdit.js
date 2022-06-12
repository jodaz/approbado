import * as React from 'react'
import {
    useMutation,
    NumberInput,
    ReferenceArrayInput,
    useEditController,
    SelectInput
} from 'react-admin'
import { validatePlan } from './plansValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import MultipleSelectTag from '@approbado/lib/components/MultipleSelectTag';
import { useParams, useHistory } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'

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
    const history = useHistory()

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
            return () => history.push('/configurations')
        }
    }, [data])

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
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Ingresa el nombre de la membresía"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Monto'>
                <NumberInput
                    source="amount"
                    placeholder="Ingresa el precio de la membresía"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Trivias grupales gratis'>
                <NumberInput
                    source="trivias_in_teams"
                    placeholder="Cantidad"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Duración de la membresía'>
                <NumberInput
                    source="duration"
                    placeholder="Duración en meses"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Acceso al foro'>
                <SelectInput
                    source="forum_access"
                    choices={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Trivias' xs='12' sm='12' md='12'>
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
