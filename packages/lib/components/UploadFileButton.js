import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useInput, InputHelperText } from 'react-admin';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as UploadIcon } from '@approbado/lib/icons/Upload.svg'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(
    theme => ({
        dropZone: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.background.dark,
            cursor: 'pointer',
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.getContrastText(
                theme.palette.background.default
            ),
            border: `1px solid #B7B7B7`,
            borderRadius: '3px',
            '& > *': {
                marginRight: '0.5rem',
                marginLeft: '0.5rem'
            }
        },
        root: { width: '100%' },
    }),
    { name: 'RaUploadFileButton' }
);

const UploadFileButton = (props) => {
    const {
        accept,
        children,
        className,
        classes: classesOverride,
        format,
        helperText,
        maxSize,
        minSize,
        multiple = false,
        options: {
            inputProps: inputPropsOptions,
            ...options
        } = {},
        parse,
        placeholder,
        resource,
        source,
        validate,
        ...rest
    } = props;
    const classes = useStyles(props);

    // turn a browser dropped file structure into expected structure
    const transformFile = file => {
        if (!(file instanceof File)) {
            return file;
        }

        const { source, title } = (React.Children.only(children)).props;

        const preview = URL.createObjectURL(file);
        const transformedFile = {
            rawFile: file,
            [source]: preview,
        };

        if (title) {
            transformedFile[title] = file.name;
        }

        return transformedFile;
    };

    const transformFiles = (files) => {
        if (!files) {
            return multiple ? [] : null;
        }

        if (Array.isArray(files)) {
            return files.map(transformFile);
        }

        return transformFile(files);
    };

    const {
        id,
        input: { onChange, value, ...inputProps },
        meta
    } = useInput({
        format: format || transformFiles,
        parse: parse || transformFiles,
        source,
        type: 'file',
        validate,
        ...rest,
    });
    const { touched, error, submitError } = meta;

    const onDrop = (newFiles, rejectedFiles, event) => {
        const updatedFiles = [...newFiles];
        onChange(updatedFiles[0]);

        if (options.onDrop) {
            options.onDrop(newFiles, rejectedFiles, event);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        ...options,
        accept,
        maxSize,
        minSize,
        multiple,
        onDrop,
    });

    return (
        <>
            <div
                data-testid="dropzone"
                className={classes.dropZone}
                {...getRootProps()}
            >
                <UploadIcon />
                <input
                    id={id}
                    {...getInputProps({
                        ...inputProps,
                        ...inputPropsOptions,
                    })}
                />
                <Typography variant="subtitle1" component="span">
                    {'Subir archivo'}
                </Typography>
            </div>
            <FormHelperText>
                <InputHelperText
                    touched={touched}
                    error={error || submitError}
                    helperText={helperText}
                />
            </FormHelperText>
        </>
    );
};

UploadFileButton.defaultProps = {
    children: <></>
}

export default UploadFileButton;
