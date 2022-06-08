import * as React from 'react'
import { Box, Grid, useMediaQuery } from '@material-ui/core'
import { Form } from 'react-final-form'
import Button from '@approbado/lib/components/Button'
import PropTypes from 'prop-types'

const BaseForm = ({
    children,
    saveButtonLabel,
    loading,
    noButton,
    unresponsive,
    validate,
    save,
    record,
    initialValues,
    defaultValue,
    formName,
    ...rest
}) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box component='div'>
            <Box component='div' padding='2rem 2rem 0 2rem'>
                { formName && <Box component='h1' fontSize='1.5rem'>{formName}</Box> }
                <Form
                    onSubmit={save}
                    validate={validate}
                    initialValues={record}
                    {...rest}
                    render={ ({ handleSubmit, submitting }) => (
                        <form id="exampleForm" onSubmit={handleSubmit}>
                            <Box sx={{
                                maxWidth: '90rem',
                                backgroundColor: theme => theme.palette.secondary.main,
                                paddingTop: '1rem'
                            }}>
                                <Grid container spacing={1}>
                                    {
                                        React.Children.map(children, child =>
                                            React.cloneElement(child, {
                                                disabled: loading || submitting
                                            })
                                        )
                                    }
                                    <Box sx={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'flex-end',
                                        padding: '1rem 0.5rem'
                                    }}>
                                        {!noButton && (
                                            <Button
                                                disabled={loading}
                                                onClick={event => {
                                                    if (event) {
                                                        event.preventDefault();
                                                        handleSubmit();
                                                    }
                                                }}
                                                type="submit"
                                                color='primary'
                                                variant="contained"
                                                fullWidth={matches}
                                            >
                                                {saveButtonLabel}
                                            </Button>
                                        )}
                                    </Box>
                                </Grid>
                            </Box>
                        </form>
                    )}
                />
            </Box>
        </Box>
    );
}

BaseForm.propTypes = {
    saveButtonLabel: PropTypes.string,
    disabled: PropTypes.bool,
}

BaseForm.defaultProps = {
    saveButtonLabel: 'Guardar',
    disabled: false,
    noButton: false,
    unresponsive: false
}

export default BaseForm;
