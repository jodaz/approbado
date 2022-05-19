import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import { ReactComponent as FacebookIcon } from "@approbado/lib/icons/FacebookIconOutline.svg"
import Box from '@material-ui/core/Box'
import { ReactComponent as GoogleIcon } from "@approbado/lib/icons/GoogleIcon.svg"

const Sessions = () => (
    <Grid container spacing={1}>
        <InputContainer labelName='Email de acceso' sm={12} md={6}>
            <TextInput name='email' placeholder='hola@email.com' fullWidth />
        </InputContainer>
        <Grid item md={12}>
            <Box display='flex' justifyContent='space-between' width='8rem'>
                <Box sx={{
                    background: '#1977F3',
                    textAlign: 'center',
                    padding: '1rem',
                    width: 'max-content',
                    borderRadius: '8px'
                }}>
                    <FacebookIcon />
                </Box>
                <Box sx={{
                    textAlign: 'center',
                    padding: '1rem',
                    width: 'max-content',
                    borderRadius: '8px',
                    margin: '0 1rem',
                    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)'
                }}>
                    <GoogleIcon />
                </Box>
            </Box>
        </Grid>
    </Grid>
);

export default Sessions;
