import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import InputContainer from '@approbado/lib/components/InputContainer'
import { TextInput } from 'react-admin'
import Button from '@approbado/lib/components/Button'
import MuiButton from '@material-ui/core/Button'

const AboutMe = ({ submitting }) => (
    <Grid container spacing={1}>
        <InputContainer disabled={submitting} labelName='Nombres' sm={12} md={6}>
            <TextInput source='names' placeholder='Nombre(s)' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Apellidos' sm={12} md={6}>
            <TextInput source='last_name' placeholder='Apellido(s)' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Usuario' sm={12} md={6}>
            <TextInput source='user_name' placeholder='Nombre de usuario' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Email' sm={12} md={6}>
            <TextInput source='email' placeholder='hola@gmail.com' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Ocupación' sm={12} md={6}>
            <TextInput source='ocupation' placeholder='Ingrese su ocupación' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Teléfono' sm={12} md={6}>
            <TextInput source='phone' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='LinkedIn' sm={12} md={6}>
            <TextInput source='profile.linkedin' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Twitter' sm={12} md={6}>
            <TextInput source='profile.twitter' fullWidth />
        </InputContainer>
        <Grid container>
            <Grid item xs='6'>
                <MuiButton variant='outlined' size='large'>
                    Cancelar
                </MuiButton>
            </Grid>
            <Grid item xs='6'>
                <Button disabled={submitting} size='large' unresponsive>
                    Guardar
                </Button>
            </Grid>
        </Grid>
    </Grid>
);

export default AboutMe;
