import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form, Field } from 'react-final-form'
import Button from '@approbado/lib/components/Button'
import Checkbox from '@approbado/lib/components/Checkbox'
import Select from './Select'
import validateSchedule from './validateSchedule'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon';
import IdeaIcon from '@approbado/lib/icons/IdeaIcon';
import AutocompleteSelectInput from './AutocompleteSelectInput'
import { axios } from '@approbado/lib/providers'
import TextInput from '@approbado/lib/components/TextInput'
import MuiDatepicker from './MuiDatepicker'
import { useSchedulesState } from '@approbado/lib/hooks/useSchedules'
import Box from '@material-ui/core/Box'
import SubthemesInput from './SubthemesInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import SuccessDialog from './SuccessDialog'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import { useUserState } from '@approbado/lib/hooks/useUserState'

const ScheduleForm = () => {
    const [trivias, setTrivias] = React.useState([])
    const [levels, setLevels] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [openDialog, setOpenDialog] = React.useState(false)
    const schedules = useSchedulesState();
    const { fetchSchedules } = useSchedulesDispatch();
    const { user } = useUserState();

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

    const handleSubmit = async (values) => {
        const { time, day, starts_at, notify_before, ...rest } = values;

        try {
            await axios.post('/schedules', {
                starts_at: `${starts_at} ${time}`,
                notify_before:  notify_before ? true : false,
                ...rest
            })

            setOpenDialog(true)
            fetchSchedules(user.id)
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }

    React.useEffect(() => {
        fetchTrivias();
        fetchLevels();
        fetchUsers();
    }, [])

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                validate={validateSchedule}
                render={({ handleSubmit, submitting, form }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container>
                            <Grid item md={6}>
                                <MuiDatepicker data={schedules} name="starts_at" />
                            </Grid>
                            <Grid item sm={6}>
                                <Grid container>
                                    <Box sx={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
                                        Agendar una trivia
                                    </Box>
                                    <InputContainer
                                        disabled={submitting}
                                        labelName='Título de la reunión'
                                        sm={12}
                                        md={12}
                                    >
                                        <TextInput
                                            name='title'
                                            placeholder='Ingrese un título'
                                            fullWidth
                                        />
                                    </InputContainer>
                                    <DateInput name="starts_at" submitting={submitting} />
                                    <TimeInput submitting={submitting} />
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
                                            name='description'
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
                                                unresponsive
                                            >
                                                Descartar
                                            </Button>
                                        </Grid>
                                        <Grid item xs='6'>
                                            <Button disabled={submitting} onClick={() => {
                                                handleSubmit();
                                                form.reset()
                                            }} size='large' unresponsive>
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
            <SuccessDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
        </>
    )
}

export default ScheduleForm
