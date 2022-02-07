import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FormControl, { useFormControl } from '@material-ui/core/FormControl';
import { makeStyles, fade, styled } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import SendIcon from '@approbado/lib/icons/SendIcon'
import { Field, Form } from 'react-final-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import { useMutation, useNotify, useRefresh } from 'react-admin'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100% !important',
        display: 'flex',
        boxShadow: props => props.focused &&
            (`0px 0px 1px 1px ${fade(theme.palette.info.main, 0.7)}`)
    },
    input: {
        width: '100%',
        border: 'none',
        flex: 1,
        padding: '0 !important',
        '&.Mui-focused': {
            border: 'none !important',
            boxShadow: 'none !important'
        }
    },
    inputContainer: {
        display: "flex",
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 0.3rem',
        width: '100%'
    },
    avatar: {
        margin: '0.5rem 0 0 0',
        padding: '0 0.5rem',
        width: '21px',
        height: '21px',
    },
    focused: {
        boxShadow: `0px 0px 1px 1px ${fade(theme.palette.info.main, 0.7)}`
    },
    sendIcon: {
        color: theme.palette.info.main,
        transition: '0.3s',
        alignSelf: 'end',
        '&:hover': {
            backgroundColor: 'unset !important',
            color: `${fade(theme.palette.info.main, 0.7)}`
        }
    }
}))

const CustomFormControl = styled(FormControl)(() => ({
    width: '100% !important',
    border: 'none !important',
    borderRadius: 6
}));

const validate = (values) => {
    const errors = {};

    if (values.summary) {
        if (values.summary.length > 250) {
            errors.summary = 'Máximo 250 caracteres'
        }
    }

    return errors;
};

const CommentContainer = () => {
    const { user } = useUserState();
    const { focused } = useFormControl() || {};
    const classes = useStyles({
        focused: focused
    });
    const notify = useNotify();
    const refresh = useRefresh();
    const [mutate, { data, loading, loaded }] = useMutation();
    const { id } = useParams()

    const handleSubmit = React.useCallback(async (values) => {
        try {
            await mutate({
                type: 'create',
                resource: 'comments',
                payload: { data: { ...values, parent_id: id } }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate]);

    React.useEffect(() => {
        if (data && loaded) {
            notify('¡Ha publicado un nuevo comentario!', 'success');
            refresh();
        }
    }, [data, loaded])

    const { picture } = user

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <Paper component="form" className={classes.root}>
                    <Avatar
                        src={`${configs.SOURCE}/${picture}`}
                        aria-label="menu"
                        className={classes.avatar}
                    />
                    <Field name='summary'>
                        {({
                            meta: { touched, error, submitError } = { touched, error, submitError },
                            input: { ...inputProps },
                            ...props
                        }) => (
                            <Box className={classes.inputContainer}>
                                <InputBase
                                    placeholder="Escribe una respuesta"
                                    className={classes.input}
                                    {...inputProps}
                                    {...props}
                                    multiline
                                    disabled={loading}
                                />
                                {(error && touched) && (
                                    <FormHelperText error style={{ paddingLeft: '0.7rem' }}>
                                        {error}
                                    </FormHelperText>
                                )}
                            </Box>
                        )}
                    </Field>
                    <IconButton
                        className={classes.sendIcon}
                        aria-label="send"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <SendIcon />
                    </IconButton>
                </Paper>
            )}
        />
    )
}

export default function CommentInput() {
    return (
        <CustomFormControl>
            <CommentContainer />
        </CustomFormControl>
    );
}
