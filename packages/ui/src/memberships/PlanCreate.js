import * as React from 'react'
import {
    TextInput,
    useCreateController,
    useMutation,
    CreateContextProvider,
    NumberInput
} from 'react-admin'
import { validatePlan } from './plansValidations';
import BaseForm from '../components/BaseForm'
import InputContainer from '@approbado/components/InputContainer'

const PlanCreate = (props) => {
    const createControllerProps = useCreateController(props);
    const [mutate] = useMutation();

    const save = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: props.resource,
                payload: { data: values }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    return (
        <CreateContextProvider value={createControllerProps}>
            <BaseForm
                save={save}
                validate={validatePlan}
                formName='Crear plan'
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
        </CreateContextProvider>
    )
}

PlanCreate.defaultProps = {
    basePath: '/memberships/plans',
    resource: 'memberships/plans'
}

export default PlanCreate
