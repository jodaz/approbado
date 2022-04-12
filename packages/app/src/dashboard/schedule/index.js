import Grid from '@material-ui/core/Grid'
import { TextInput } from 'react-admin'
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form } from 'react-final-form'
import Button from '@approbado/lib/components/Button'

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
                        <Grid item sm={6}>
                            <InputContainer disabled={submitting} labelName='Título de la reunión' sm={12} md={12}>
                                <TextInput
                                    source='title'
                                    placeholder='Ingrese un título'
                                    fullWidth
                                />
                            </InputContainer>
                            <InputContainer disabled={submitting} labelName='Descripción' sm={12} md={12}>
                                <TextInput
                                    source='description'
                                    placeholder='Añadir una descripción'
                                    fullWidth
                                    multiline
                                />
                            </InputContainer>
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
                </form>
            )}
        />
    )
}

export default ScheduleForm
