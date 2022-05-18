import * as React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ActionDelete } from '@approbado/lib/icons/Trash.svg';
import { useMutation, useNotify, useRefresh } from 'react-admin';
import MenuButton from './MenuButton'
import Confirm from '@approbado/lib/layouts/Confirm';
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box';

const DeleteButton = (
    props
) => {
    const {
        basePath,
        classes: classesOverride,
        confirmTitle = 'ra.message.delete_title',
        confirmContent = 'ra.message.delete_content',
        icon = defaultIcon,
        label,
        record,
        confirmColor,
        customAction
    } = props;
    const [mutate, { data, loading, loaded }] = useMutation();
    const [open, setOpen] = React.useState(false);
    const notify = useNotify();
    const refresh = useRefresh();
    const ref = React.useRef(null);

    const handleDelete = React.useCallback(async () => {
        try {
            await mutate({
                type: 'delete',
                resource: basePath,
                payload: { id: record.id }
            }, { returnPromise: true })
        } catch (error) {
            console.log(error)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate])

    const handleDialog = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        if (loaded) {
            notify(`Se ha eliminado el registro con éxito`, 'success')

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
            <MenuItem ref={ref} onClick={handleDialog}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px'
                }}>
                    {icon}
                </Box>
                {label}
            </MenuItem>
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
