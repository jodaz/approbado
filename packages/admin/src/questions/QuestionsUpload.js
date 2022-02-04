import * as React from 'react'
import {
    useRedirect,
    useNotify
} from 'react-admin'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import isEmpty from 'is-empty'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import configs from '@approbado/lib/configs'

const validate = (values) => {
    const errors = {};

    // if (!values.title) {
    //     errors.title = "Ingrese un nombre para el archivo.";
    // }
    // if (!values.subtheme_id) {
    //     errors.subtheme_id = "Seleccione un subtema.";
    // }
    // if (!values.file) {
    //     errors.file = "Ingrese un archivo.";
    // }

    return errors;
};

const FileCreate = () => {
    const { trivia_id, subtheme_id } = useParams()
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const redirect = useRedirect()
    const notify = useNotify();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, subtheme_id: subtheme_id, ...values };

        try {
            await provider({
                resource: 'questions/upload',
                type: 'create',
                payload: data
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider, trivia_id])

    React.useEffect(() => {
        if (!isEmpty(fileDataResponse)) {
            notify('¡Ha subido nuevas preguntas a la trivia!', 'success')
            redirect(`/trivias/${trivia_id}/subthemes/${subtheme_id}/show`)
        }
    }, [fileDataResponse])

    return (
        <BaseForm
            save={save}
            validate={validate}
            loading={loading}
        >
            <Box marginBottom="1rem">
                <Typography variant="h5" component="div" gutterBottom paragraph>
                    Subir de forma masiva
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Descarga el archivo con el formato en excel y súbelo con los datos que deseas ingresar a la plataforma.
                </Typography>
                <Link href={`${configs.SOURCE}/public/default/Preguntas_FORMATO.xlsx`} underline="always" color="info">
                    Descargar formato
                </Link>
            </Box>
            <InputContainer labelName="" xs={12} md={12}>
                <UploadFileButton
                    name="file"
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    loading={loading}
                />
            </InputContainer>
        </BaseForm>
    )
}

export default FileCreate
