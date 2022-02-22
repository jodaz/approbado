import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import InputContainer from '@approbado/lib/components/InputContainer'
import { TextInput } from 'react-admin'

const AboutMe = () => (
    <Grid container spacing={1}>
        <InputContainer labelName='Email de acceso' sm={12} md={6}>
            <TextInput source='email' placeholder='hola@email.com' fullWidth />
        </InputContainer>
    </Grid>
);

export default AboutMe;
