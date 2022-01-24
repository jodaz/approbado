import * as React from 'react'
import {
    TextInput,
    useCreateController,
    useMutation,
    CreateContextProvider,
    NumberInput,
    ReferenceArrayInput,
    SelectArrayInput,
    useRedirect,
    useNotify,
} from 'react-admin'
import { validatePlan } from './plansValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'

const PlanCreate = (props) => {
    const createControllerProps = useCreateController(props);
    const [mutate, { data, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();

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

    React.useEffect(() => {
        if (data && loaded) {
            notify('Se ha completado el registro con éxito')
            redirect('/memberships?tab=plans')
        }
    }, [data, loaded])

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
                <InputContainer
                    labelName='Trivias'
                >
                    <ReferenceArrayInput
                        source="trivia_ids"
                        reference="trivias"
                        fullWidth
                    >
                        <SelectArrayInput />
                    </ReferenceArrayInput>
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
