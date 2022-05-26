import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FormControl, { useFormControl } from '@material-ui/core/FormControl';
import { makeStyles, alpha, styled } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import SendIcon from '@approbado/lib/icons/SendIcon'
import { Field, Form } from 'react-final-form';
import Box from '@material-ui/core/Box'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import { useMutation, useNotify, useRefresh } from 'react-admin'
import { useParams } from 'react-router-dom'
import AddFileInput from './AddFileInput'
import AddImageInput from './AddImageInput'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100% !important',
        display: 'flex',
        boxShadow: props => props.focused &&
            (`0px 0px 1px 1px ${alpha(theme.palette.info.main, 0.7)}`)
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
        boxShadow: `0px 0px 1px 1px ${alpha(theme.palette.info.main, 0.7)}`
    },
    icon: {
        color: theme.palette.primary.main,
        transition: '0.3s',
        alignSelf: 'end',
        '&:hover': {
            backgroundColor: 'unset !important',
            color: `${alpha(theme.palette.primary.main, 0.7)}`
        }
    },
    containerButtons: {
        display: 'flex'
    }
}))

const CustomFormControl = styled(FormControl)(() => ({
    width: '100% !important',
    border: 'none !important',
    borderRadius: 6
}));

const CommentContainer = () => {
    const { user } = useUserState();
    const { focused } = useFormControl() || {};
    const classes = useStyles({
        focused: focused
    });
    const loading = false;

    const handleSubmit = React.useCallback(async (values) => {
    }, []);

    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <Paper component="form" className={classes.root}>
                    <Box className={classes.containerButtons}>
                        <AddFileInput />
                        <AddImageInput />
                    </Box>
                    <Field name='summary'>
                        {({
                            meta: { touched, error } = { touched, error },
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
                            </Box>
                        )}
                    </Field>
                    <IconButton
                        className={classes.icon}
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
