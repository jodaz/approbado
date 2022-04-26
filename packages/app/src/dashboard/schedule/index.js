import Grid from '@material-ui/core/Grid'
import {
    TextInput,
    DateInput,
    ReferenceInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    SelectInput
} from 'react-admin'
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form, useFormState, Field } from 'react-final-form'
import Button from '@approbado/lib/components/Button'
import Checkbox from '@approbado/lib/components/Checkbox'

const SubthemesInput = () => {
    const { values } = useFormState();

    if (!values.trivia_id) return null;

    return (
        <InputContainer labelName='Subtema' sm='12' md='12'>
            <ReferenceInput
                source='subtheme_id'
                reference='subthemes'
                allowEmpty
                fullWidth
                defaultValue={{ trivia_id: values.trivia_id }}
            >
                <SelectInput fullWidth source="name" emptyText="N/A" />
            </ReferenceInput>
        </InputContainer>
    )
}

const ScheduleForm = () => {
    const handleSubmit = values => {
        console.log(values)
    }

    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit, submitting, form, pristine }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container>
                        <Grid item md={6}></Grid>
                        <Grid item sm={6}>
                            <Grid container>
                                <InputContainer
                                    disabled={submitting}
                                    labelName='Título de la reunión'
                                    sm={12}
                                    md={12}
                                >
                                    <DateInput
                                        source='date'
                                        placeholder='Día'
                                        fullWidth
                                    />
                                </InputContainer>
                                <InputContainer disabled={submitting} labelName='Título de la reunión' sm={12} md={12}>
                                    <TextInput
                                        source='title'
                                        placeholder='Ingrese un título'
                                        fullWidth
                                    />
                                </InputContainer>
                                <InputContainer labelName='Trivia' sm='12' md='12'>
                                    <ReferenceInput
                                        source='trivia_id'
                                        reference='trivias'
                                        allowEmpty
                                        fullWidth
                                    >
                                        <SelectInput  fullWidth source="name" emptyText="N/A" />
                                    </ReferenceInput>
                                </InputContainer>
                                <InputContainer labelName='Nivel' sm='12' md='12'>
                                    <ReferenceInput
                                        source='level_id'
                                        reference='configurations/levels'
                                        allowEmpty
                                        fullWidth
                                    >
                                        <SelectInput  fullWidth source="name" emptyText="N/A" />
                                    </ReferenceInput>
                                </InputContainer>
                                <InputContainer labelName='Usuario' sm='12' md='12'>
                                    <ReferenceArrayInput
                                        source="users_ids"
                                        reference="users"
                                        fullWidth
                                    >
                                        <AutocompleteArrayInput source="names" emptyText="NA" />
                                    </ReferenceArrayInput>
                                </InputContainer>
                                <SubthemesInput />
                                <InputContainer disabled={submitting} labelName='Descripción' sm={12} md={12}>
                                    <TextInput
                                        source='description'
                                        placeholder='Añadir una descripción'
                                        fullWidth
                                        multiline
                                    />
                                </InputContainer>
                                <Field
                                    name="conditions"
                                    type="checkbox"
                                    value="conditions"
                                    component={Checkbox}
                                >
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        Enviar recordatorio 30 minutos antes de la reunión
                                    </label>
                                </Field>
                                <Grid container>
                                    <Grid item xs='6'>
                                        <Button
                                            variant='outlined'
                                            size='large'
                                            onClick={() => {
                                                form.reset();
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                    </Grid>
                                    <Grid item xs='6'>
                                        <Button disabled={submitting} onClick={handleSubmit} size='large' unresponsive>
                                            Guardar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            )}
        />
    )
}

export default ScheduleForm
