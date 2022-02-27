import * as React from 'react'
import {
    useMutation,
    TextInput,
    useRedirect,
    SelectInput,
    useNotify,
    useEditController,
    ReferenceInput,
    BooleanInput
} from 'react-admin'
import { useParams } from 'react-router-dom'
import InputContainer from '@approbado/lib/components/InputContainer'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { FieldArray } from 'react-final-form-arrays'
import { Form } from "react-final-form";
import arrayMutators from 'final-form-arrays'
import CustomCreateButton from '@approbado/lib/components/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { unmarkOptions, validate } from './questionsFormUtils'
import FormHelperText from '@material-ui/core/FormHelperText';

const OPTIONS = [
    { id: '1', name: 'Respuesta correcta' },
    { id: '0', name: 'Respuesta incorrecta' }
]

const useStyles = makeStyles(theme => ({
    arrayRootField: {
        marginBottom: '2rem'
    },
    button: {
        border: `1px solid ${theme.palette.primary.light}`,
        color: `${theme.palette.info.light}`,
        borderRadius: '6px',
        textTransform: 'none',
        fontWeight: 600,
        padding: '5px 15px !important'
    },
    arrayItem: {
        paddingBottom: '2rem',
        paddingRight: '1rem'
    }
}))

const QuestionEdit = props => {
    const { subtheme_id, question_id } = useParams()
    const editControllerProps = useEditController({
        ...props,
        id: question_id
    });
    const [mutate, { data, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();
    const classes = useStyles();

    const save = React.useCallback(async (values) => {
        const data = { subtheme_id: subtheme_id, ...values };

        try {
            await mutate({
                type: 'update',
                resource: 'questions',
                payload: { id: question_id, data: data }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate, subtheme_id])

    React.useEffect(() => {
        if (loaded) {
            notify(`¡Actualizó la pregunta "${data.description}" exitosamente!`, 'success')
            redirect(`/trivias/${subtheme_id}/subthemes/${data.subtheme_id}/show?tab=questions`)
        }
    }, [loaded])

    const { record, loaded: loadedRecord } = editControllerProps

    if (!loadedRecord) return null

    return (
        <Box component='div'>
            <Form
                initialValues={record}
                onSubmit={save}
                mutators={{
                    ...arrayMutators,
                    unmarkOptions
                }}
                validate={validate}
                initialValues={record}
                render={({
                    handleSubmit,
                    form: {
                        mutators: { push, unmarkOptions }
                    },
                    values,
                    submitting,
                    errors
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Box maxWidth="90em" paddingTop='2rem'>
                                <Grid container spacing={1}>
                                    <Typography component='h1' variant='h5'>{'Crear pregunta'}</Typography>
                                    <Box paddingBottom='1rem' width='100%'>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Enunciado
                                        </Typography>
                                    </Box>
                                    <InputContainer labelName='Pregunta' sm={12} md={12}>
                                        <TextInput
                                            source="description"
                                            placeholder="Ingresa el enunciado"
                                            disabled={submitting}
                                            fullWidth
                                            multiline
                                        />
                                    </InputContainer>
                                    <Grid container className={classes.arrayRootField}>
                                        <FieldArray name="options">
                                            {({ fields }) =>
                                                fields.map((name, index) => (
                                                    <Grid item xs={12} sm={12} md={6} key={name} className={classes.arrayItem}>
                                                        <InputLabel>Opción {index + 1}</InputLabel>
                                                        <TextInput
                                                            source={`${name}.statement`}
                                                            placeholder="Ingrese la respuesta"
                                                            fullWidth
                                                            label=""
                                                            disabled={submitting}
                                                        />
                                                        <Box width="100%" display="flex" justifyContent="space-between">
                                                            <BooleanInput
                                                                source={`${name}.is_right`}
                                                                label="Opción correcta"
                                                                onClick={unmarkOptions}
                                                            />
                                                            <Grid item>
                                                                <Button
                                                                    variant="outlined"
                                                                    type="button"
                                                                    onClick={() => (values.options.length > 1) ? fields.remove(index) : null}
                                                                    className={classes.button}
                                                                    disabled={!(values.options.length > 1)}
                                                                >
                                                                    Eliminar opción
                                                                </Button>
                                                            </Grid>
                                                        </Box>
                                                    </Grid>
                                                ))
                                            }
                                        </FieldArray>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <Button
                                                    variant="outlined"
                                                    type="button"
                                                    onClick={() => push('options', undefined)}
                                                    className={classes.button}
                                                >
                                                    Agregar opción
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {errors.options_field && <FormHelperText error>{errors.options_field}</FormHelperText>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Box paddingBottom='1rem' width='100%'>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {'Aclaratorias'}
                                        </Typography>
                                    </Box>
                                    <InputContainer sm='12' md='6' labelName='Mostrar cuando'>
                                        <SelectInput
                                            source="explanation_type"
                                            choices={OPTIONS}
                                            disabled={submitting}
                                            fullWidth
                                            emptyText="Sin aclaratoria"
                                        />
                                    </InputContainer>
                                    <InputContainer sm='12' md='6' labelName='Aclaratoria'>
                                        <TextInput
                                            source="explanation"
                                            placeholder="Ingrese el texto de la aclaratoria"
                                            disabled={submitting}
                                            fullWidth
                                        />
                                    </InputContainer>
                                    <InputContainer sm='12' md='6' labelName='Archivo de referencia'>
                                        <ReferenceInput
                                            source="file_id"
                                            reference="files"
                                            disabled={submitting}
                                            fullWidth
                                            allowEmpty
                                        >
                                            <SelectInput
                                                optionText="title"
                                                emptyText="N/A"
                                            />
                                        </ReferenceInput>
                                    </InputContainer>
                                    <InputContainer labelName='Nivel' sm='12' md='6'>
                                        <ReferenceInput
                                            source='level_id'
                                            reference='configurations/levels'
                                            allowEmpty
                                            fullWidth
                                        >
                                            <SelectInput source="name" emptyText="N/A" />
                                        </ReferenceInput>
                                    </InputContainer>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={4} lg={3}>
                                            <CustomCreateButton
                                                disabled={submitting}
                                                onClick={event => {
                                                    if (event) {
                                                        event.preventDefault();
                                                    }
                                                    console.log(errors)
                                                    handleSubmit()
                                                }}
                                            >
                                                Actualizar
                                            </CustomCreateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    )
                }}
            />
        </Box>
    )
}

QuestionEdit.defaultProps = {
    basePath: '/questions',
    resource: 'questions'
}

export default QuestionEdit
