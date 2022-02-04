import * as React from 'react'
import {
    useMutation,
    TextInput,
    useRedirect,
    SelectInput,
    useNotify,
    ReferenceInput,
    BooleanInput
} from 'react-admin'
import { useParams } from 'react-router-dom'
import InputContainer from '@approbado/lib/components/InputContainer'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { FieldArray } from 'react-final-form-arrays'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import CustomCreateButton from '@approbado/lib/components/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import isEmpty from 'is-empty'

const validate = (values) => {
    const errors = {};

    if (!values.description) {
        errors.description = "Ingrese un enunciado para la pregunta.";
    }
    if (!values.explanation) {
        errors.explanation = "Ingrese el texto de la aclaratoria.";
    }
    if (!values.explanation_type) {
        errors.explanation_type = "Seleccione cuando debe mostrarse la aclaratoria.";
    }
    if (!values.file_id) {
        errors.file_id = "Seleccione un archivo.";
    }

    return errors;
};

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

// // custom Mutator to write into formState.errors object
// const setError = ([name, value], state, { setIn }) =>
//   setIn(state, `formState.errors.${name}`, value);

const uncheck = (args, state, { setIn, changeValue }) => {
    // if (args) {
    //     console.log(state.fields)
    // }
    // alert("hi");
    // changeValue(state, "lastName", () => "xxx");
    // const field = state.fields["lastName"];
    // field.change("bob");
    // state.formState.submitFailed = true;
    // field.data = {...field.data, initialError: 'x0x0x'};
};

const QuestionCreate = () => {
    const { subtheme_id } = useParams()
    const [mutate, { data, loading, loaded }] = useMutation();
    const redirect = useRedirect()
    const notify = useNotify();
    const initialFormState = { options: [{}] };
    const classes = useStyles();

    const save = React.useCallback(async (values) => {
        const data = { subtheme_id: subtheme_id, ...values };

        try {
            await mutate({
                type: 'create',
                resource: 'questions',
                payload: { data: data }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate, subtheme_id])

    React.useEffect(() => {
        if (data && loaded) {
            notify('¡Has creado una nueva pregunta!', 'success')
            redirect(`/trivias/${subtheme_id}/subthemes/${data.id}/show?tab=questions`)
        }
    }, [data, loaded])

    return (
        <Box component='div'>
            <Form
                onSubmit={save}
                mutators={{
                    ...arrayMutators
                }}
                validate={validate}
                initialValues={initialFormState}
                render={({
                    handleSubmit,
                    form: {
                        mutators: { push }
                    },
                    values
            }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Box maxWidth="90em" paddingTop='2rem'>
                                <Grid container spacing={1}>
                                    <Typography component='h1' variant='h5'>{'Crear pregunta'}</Typography>
                                    <Box paddingBottom='1rem' width='100%'>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {'Enunciado'}
                                        </Typography>
                                    </Box>
                                    <InputContainer labelName='Pregunta' sm={12} md={12}>
                                        <TextInput
                                            source="description"
                                            placeholder="Ingresa el enunciado"
                                            disabled={loading}
                                            fullWidth
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
                                                            disabled={loading}
                                                        />
                                                        <Box width="100%" display="flex" justifyContent="space-between">
                                                            <BooleanInput
                                                                source={`${name}.is_right`}
                                                                label="Opción correcta"
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
                                            <Button
                                                variant="outlined"
                                                type="button"
                                                onClick={() => push('options', undefined)}
                                                className={classes.button}
                                            >
                                                Agregar opción
                                            </Button>
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
                                            disabled={loading}
                                            fullWidth
                                        />
                                    </InputContainer>
                                    <InputContainer sm='12' md='6' labelName='Aclaratoria'>
                                        <TextInput
                                            source="explanation"
                                            placeholder="Ingrese el texto de la aclaratoria"
                                            disabled={loading}
                                            fullWidth
                                        />
                                    </InputContainer>
                                    <InputContainer sm='12' md='6' labelName='Archivo de referencia'>
                                        <ReferenceInput
                                            source="file_id"
                                            reference="files"
                                            disabled={loading}
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
                                                disabled={loading}
                                                onClick={event => {
                                                    if (event) {
                                                        event.preventDefault();
                                                    }
                                                    handleSubmit()
                                                }}
                                            >
                                                {'Crear'}
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

export default QuestionCreate
