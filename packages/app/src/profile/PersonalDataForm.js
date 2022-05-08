import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import InputContainer from '@approbado/lib/components/InputContainer'
import Button from '@approbado/lib/components/Button'
import MuiButton from '@material-ui/core/Button'
import DefaultLinkBehavior from '@approbado/lib/components/LinkBehavior'
import TextInput from '@approbado/lib/components/TextInput'
import formatString from "format-string-by-pattern";

const AboutMe = ({ submitting, handleSubmit }) => (
    <Grid container spacing={1}>
        <InputContainer disabled={submitting} labelName='Nombres' sm={12} md={6}>
            <TextInput name='names' placeholder='Nombre(s)' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Apellidos' sm={12} md={6}>
            <TextInput name='last_name' placeholder='Apellido(s)' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Usuario' sm={12} md={6}>
            <TextInput name='user_name' placeholder='Nombre de usuario' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Email' sm={12} md={6}>
            <TextInput name='email' placeholder='hola@gmail.com' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Ocupación' sm={12} md={6}>
            <TextInput name='profile.ocupation' placeholder='Ingrese su ocupación' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Teléfono' sm={12} md={6}>
            <TextInput
                parse={formatString("+49 (AAAA) BBBBBBB")}
                name='phone'
                fullWidth
            />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='LinkedIn' sm={12} md={6}>
            <TextInput name='profile.linkedin' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Twitter' sm={12} md={6}>
            <TextInput name='profile.twitter' fullWidth />
        </InputContainer>
        <InputContainer disabled={submitting} labelName='Biografía' sm={12} md={12}>
            <TextInput name='profile.summary' fullWidth multiline />
        </InputContainer>
        <Grid container>
            <Grid item xs='6'>
                <MuiButton variant='outlined' size='large' component={DefaultLinkBehavior} to='/profile'>
                    Cancelar
                </MuiButton>
            </Grid>
            <Grid item xs='6'>
                <Button disabled={submitting} onClick={handleSubmit} size='large' unresponsive>
                    Guardar
                </Button>
            </Grid>
        </Grid>
    </Grid>
);

export default AboutMe;
