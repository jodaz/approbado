import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form, Field } from 'react-final-form'
import Button from '@approbado/lib/components/Button'
import Checkbox from '@approbado/lib/components/Checkbox'
import validateSchedule from './validateSchedule'
import SelectTriviasInput from './SelectTriviasInput'
import SelectLevelsInput from './SelectLevelInput'
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
import { useParams } from 'react-router-dom'
import SelectUsersInput from './SelectUsersInput'

const ScheduleForm = () => {
    const { id } = useParams();
    const [openDialog, setOpenDialog] = React.useState(false)
    const schedules = useSchedulesState();
    const { fetchSchedules } = useSchedulesDispatch();
    const [record, setRecord] = React.useState({})
    const { user } = useUserState();

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

    const fetchRecord = React.useCallback(async (scheduleID) => {
        const { data } = await axios.get(`/schedules/${scheduleID}`);

        setRecord(data);
    }, []);

    React.useEffect(async () => {
        if (id) {
            await fetchRecord(id);
        }
    }, [id])

    if (id && !Object.entries(record).length) return null;

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                validate={validateSchedule}
                initialValues={record}
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
                                        label='Título de la reunión'
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
                                    <SelectUsersInput />
                                    <SelectTriviasInput />
                                    <SelectLevelsInput />
                                    <SubthemesInput submitting={submitting} />
                                    <InputContainer disabled={submitting} label='Descripción' sm={12} md={12}>
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
