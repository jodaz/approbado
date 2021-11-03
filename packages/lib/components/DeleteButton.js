import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ReactComponent as ActionDelete } from '@approbado/lib/icons/Trash.svg';
import classnames from 'classnames';
import { useMutation, useNotify, useRefresh } from 'react-admin';

import Confirm from '@approbado/lib/layouts/Confirm';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const DeleteButton = (
    props
) => {
    const {
        basePath,
        classes: classesOverride,
        className,
        confirmTitle = 'ra.message.delete_title',
        confirmContent = 'ra.message.delete_content',
        icon = defaultIcon,
        label,
        mutationMode,
        onClick,
        record,
        confirmColor,
        customAction,
        ...rest
    } = props;
    const [mutate, { data, loading, loaded }] = useMutation();
    const classes = useStyles(props);
    const [open, setOpen] = React.useState(false);
    const notify = useNotify();
    const refresh = useRefresh();

    const handleDelete = React.useCallback(async () => {
        try {
            await mutate({
                type: 'delete',
                resource: basePath,
                payload: { id: record.id }
            }, { returnPromise: true })
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    const handleDialog = e => {
        setOpen(!open);
        e.stopPropagation();
    };

    React.useEffect(() => {
        if (data && loaded) {
            notify(`Se ha eliminado el registro con éxito`)

            if (customAction) {
                customAction();
            } else {
                refresh();
            }

            setOpen(!open);
        }
    }, [data, loaded])

    return (
        <React.Fragment>
            <Button
                onClick={handleDialog}
                className={classnames(
                    'ra-delete-button',
                    classes.deleteButton,
                    className
                )}
                key="button"
                {...rest}
            >
                {icon}
                {(label) &&
                    <Typography variant="subtitle2">
                        {label}
                    </Typography>
                }
            </Button>
            <Confirm
                isOpen={open}
                loading={loading}
                title={confirmTitle}
                content={confirmContent}
                onConfirm={handleDelete}
                onClose={handleDialog}
                confirmColor={confirmColor}
            />
        </React.Fragment>
    );
};

const defaultIcon = <ActionDelete />;

const useStyles = makeStyles(
    theme => ({
        deleteButton: {
            color: theme.palette.primary.main,
            textTransform: 'none',
            '&:hover': {
                borderRadius: '4px',
                backgroundColor: fade(theme.palette.primary.light, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }),
    { name: 'RaDeleteWithConfirmButton' }
);

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    confirmTitle: PropTypes.string,
    confirmContent: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    icon: PropTypes.element,
    confirmColor: PropTypes.oneOf(['primary', 'warning']),
};

export default DeleteButton;
