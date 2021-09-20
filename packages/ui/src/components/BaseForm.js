import * as React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { FormWithRedirect } from 'react-admin'
import SaveButton from '@approbado/components/SaveButton'
import PropTypes from 'prop-types'

const BaseForm = ({ formName, children, saveButtonLabel, ...rest }) => (
    <Box component='div'>
        {formName !== '' && (
            <Typography component='h1' variant='h5'>{formName}</Typography>
        )}
        <Box component='div' paddingTop='2rem'>
            <FormWithRedirect
                {...rest}
                render={ ({ handleSubmitWithRedirect, saving }) => (
                    <Box maxWidth="90em">
                        <Grid container spacing={1}>
                            {children}
                            <Grid item xs={12}>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    saving={saving}
                                    label={saveButtonLabel}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            />
        </Box>
    </Box>
);

BaseForm.propTypes = {
    formName: PropTypes.string,
    saveButtonLabel: PropTypes.string
}

BaseForm.defaultProps = {
    formName: '',
    saveButtonLabel: 'Guardar'
}

export default BaseForm;