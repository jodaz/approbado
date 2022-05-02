import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import {
    TextInput,
    DateInput
} from 'react-admin'
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form, useFormState, Field } from 'react-final-form'
import Button from '@approbado/lib/components/Button'
import Checkbox from '@approbado/lib/components/Checkbox'
import Select from './Select'
import validateSchedule from './validateSchedule'
import { axios } from '@approbado/lib/providers'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';
import IdeaIcon from '@approbado/lib/icons/IdeaIcon';
import LayerIcon from '@approbado/lib/icons/LayerIcon';
import AutocompleteSelectInput from './AutocompleteSelectInput'

const SubthemesInput = ({ submitting }) => {
    const { values: { trivia_id } } = useFormState();
    const [subthemes, setSubthemes] = React.useState([])

    const fetchSubthemes = React.useCallback(async (trivia) => {
        const { data: { data } } = await axios.get(`/subthemes?filter[trivia_id]=${trivia}`)
        setSubthemes(data)
    }, []);

    React.useEffect(() => {
        if (trivia_id) {
            fetchSubthemes(trivia_id);
        }
    }, [trivia_id])

    if (!trivia_id) return null;

    return (
        <InputContainer
            disabled={submitting}
            labelName="Tema"
            md={12}
            xs={12}
        >
            <Field
                component={Select}
                name='subtheme_id'
                options={subthemes}
                icon={<LayerIcon />}
            />
        </InputContainer>
    )
}

const ScheduleForm = () => {
    const [trivias, setTrivias] = React.useState([])
    const [levels, setLevels] = React.useState([])
    const [users, setUsers] = React.useState([])

    const fetchTrivias = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/trivias')
        setTrivias(data)
    }, []);

    const fetchLevels = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/configurations/levels')
        setLevels(data)
    }, []);

    const fetchUsers = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/users?filter[is_registered]=true')
        setUsers(data)
    }, []);

    const handleSubmit = values => {
        console.log(values)
    }

    React.useEffect(() => {
        fetchTrivias();
        fetchLevels();
        fetchUsers();
    }, [])

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validateSchedule}
            render={({ handleSubmit, submitting, form }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container>
                        <Grid item md={6}></Grid>
                        <Grid item sm={6}>
                            <Grid container>
                                <InputContainer
                                    disabled={submitting}
                                    labelName='starts_at'
                                    sm={12}
                                    md={12}
                                >
                                    <DateInput
                                        source='date'
                                        placeholder='Día'
                                        fullWidth
                                    />
                                </InputContainer>
                                <InputContainer
                                    disabled={submitting}
                                    labelName='Título de la reunión'
                                    sm={12}
                                    md={12}
                                >
                                    <TextInput
                                        source='title'
                                        placeholder='Ingrese un título'
                                        fullWidth
                                    />
                                </InputContainer>
                                <InputContainer
                                    disabled={submitting}
                                    labelName="Participantes"
                                    md={12}
                                    xs={12}
                                >
                                    <Field
                                        component={AutocompleteSelectInput}
                                        name='users_ids'
                                        options={users}
                                        placeholder='Ingresar jugadores (máx: 5)'
                                    />
                                </InputContainer>
                                <InputContainer
                                    disabled={submitting}
                                    labelName="Trivia"
                                    md={12}
                                    xs={12}
                                >
                                    <Field
                                        component={Select}
                                        name='trivia_id'
                                        options={trivias}
                                        icon={<BalanceIcon />}
                                    />
                                </InputContainer>
                                <InputContainer
                                    disabled={submitting}
                                    labelName="Nivel"
                                    md={12}
                                    xs={12}
                                >
                                    <Field
                                        component={Select}
                                        name='level_id'
                                        options={levels}
                                        icon={<IdeaIcon />}
                                    />
                                </InputContainer>
                                <SubthemesInput submitting={submitting} />
                                <InputContainer disabled={submitting} labelName='Descripción' sm={12} md={12}>
                                    <TextInput
                                        source='description'
                                        placeholder='Añadir una descripción'
                                        fullWidth
                                        multiline
                                    />
                                </InputContainer>
                                <Field
                                    name="notify_before"
                                    type="checkbox"
                                    value="notify_before"
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
                                            onClick={form.reset}
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
