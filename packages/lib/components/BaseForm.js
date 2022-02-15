import * as React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Form } from 'react-final-form'
import Button from '@approbado/lib/components/Button'
import PropTypes from 'prop-types'

const BaseForm = ({
    formName,
    children,
    saveButtonLabel,
    loading,
    noButton,
    unresponsive,
    validate,
    save
}) => (
    <Box component='div'>
        { formName && <Typography component='h1' variant='h5'>{formName}</Typography> }
        <Box component='div' paddingTop='2rem'>
            <Form
                onSubmit={save}
                validate={validate}
                render={ ({ handleSubmit }) => (
                    <form id="exampleForm" onSubmit={handleSubmit}>
                        <Box maxWidth="90em">
                            <Grid container spacing={1}>
                                {
                                    React.Children.map(children, child =>
                                        React.cloneElement(child, {
                                            disabled: loading
                                        })
                                    )
                                }
                                {!noButton && (
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={4} lg={3}>
                                            <Button
                                                disabled={loading}
                                                onClick={event => {
                                                    if (event) {
                                                        event.preventDefault();
                                                        handleSubmit();
                                                    }
                                                }}
                                                unresponsive={unresponsive}
                                                type="submit"
                                            >
                                                {saveButtonLabel}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </form>
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
    saveButtonLabel: 'Guardar',
    disabled: false,
    noButton: false,
    unresponsive: false
}

export default BaseForm;
