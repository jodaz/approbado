import * as React from 'react'
import {
    useMutation,
    TextInput,
    useEditController,
    EditContextProvider,
    useRedirect,
    NumberInput
} from 'react-admin'
import { validatePlan } from './plansValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useParams } from 'react-router-dom'

const PlanEdit = props => {
    const { id } = useParams();
    const editControllerProps = useEditController({
        ...props,
        id: id
    });
    const [mutate, { data }] = useMutation();
    const { record } = editControllerProps;
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

    return (
        <EditContextProvider value={editControllerProps}>
            <BaseForm
                save={save}
                validate={validatePlan}
                record={record}
                saveButtonLabel='Actualizar'
            >
                <InputContainer
                    labelName='Nombre'
                >
                    <TextInput
                        source="name"
                        placeholder="Nombre"
                        fullWidth
                    />
                </InputContainer>
                <InputContainer
                    labelName='Monto'
                >
                    <NumberInput
                        source="amount"
                        placeholder="0.00"
                        fullWidth
                    />
                </InputContainer>
            </BaseForm>
        </EditContextProvider>
    )
}

PlanEdit.defaultProps = {
    basePath: '/memberships/plans',
    resource: 'memberships/plans'
}

export default PlanEdit
