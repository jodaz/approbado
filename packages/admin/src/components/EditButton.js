import * as React from 'react'
import { linkToRecord, useResourceContext } from 'ra-core';
import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '@approbado/lib/icons/Edit.svg'
import Button from '@material-ui/core/Button';

const EditButton = ({
    basePath,
    record,
    scrollToTop = true,
    ...rest
}) => {
    const resource = useResourceContext();

    return (
        <Button
            component={Link}
            to={React.useMemo(
                () => ({
                    pathname: record
                        ? linkToRecord(basePath || `/${resource}`, record.id)
                        : '',
                    state: { _scrollToTop: scrollToTop },
                }),
                [basePath, record, resource, scrollToTop]
            )}
            label='Editar'
            onClick={stopPropagation}
            {...rest}
        >
            <EditIcon />
        </Button>
    );
};

const stopPropagation = e => e.stopPropagation();

export default EditButton
