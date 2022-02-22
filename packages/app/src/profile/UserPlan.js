import * as React from 'react'
import Box from '@material-ui/core/Box'
import CustomButton from '@approbado/lib/components/Button'

const AboutMe = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Box sx={{ textTransform: 'uppercase'}}>
            Tu plan
        </Box>
        <Box component='h1'>
            Approbado Free
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
        }}>
            <Box width='50%'>
                Actualmente tienes una cuenta free, cambiate a premium
                 y obtén más beneficios 😄
            </Box>
            <Box width='20%'>
                <CustomButton>
                    Ser premium
                </CustomButton>
            </Box>
        </Box>
    </Box>
);

export default AboutMe;
