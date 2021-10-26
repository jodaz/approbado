import * as React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { FormWithRedirect } from 'react-admin'
import SaveButton from '@approbado/lib/components/SaveButton'
import PropTypes from 'prop-types'

const BaseForm = ({ formName, children, saveButtonLabel, loading, ...rest }) => (
    <Box component='div'>
        <Typography component='h1' variant='h5'>{formName}</Typography>
        <Box component='div' paddingTop='2rem'>
            <FormWithRedirect
                {...rest}
                render={ ({ handleSubmitWithRedirect, saving }) => (
                    <Box maxWidth="90em">
                        <Grid container spacing={1}>
                            {
                                React.Children.map(children, child =>
                                    React.cloneElement(child, {
                                        disabled: loading
                                    })
                                )
                            }
                            <Grid item xs={12}>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    disabled={loading}
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
    saveButtonLabel: PropTypes.string,
    disabled: PropTypes.boolean
}

BaseForm.defaultProps = {
    formName: '',
    saveButtonLabel: 'Guardar',
    disabled: false
}

export default BaseForm;
