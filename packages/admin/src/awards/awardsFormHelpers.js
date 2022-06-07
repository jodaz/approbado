import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import { useFormState } from 'react-final-form'
import ImageInput from '@approbado/lib/components/ImageInput'
import Box from '@material-ui/core/Box'
import InputContainer from '@approbado/lib/components/InputContainer'

export const ACCESS_TYPES = [
    { id: 'Insignia', name: 'Insignia' },
    { id: 'Certificado', name: 'Certificado' }
]

export const FileInput = ({ loading }) => {
    const { values } = useFormState();

    if (!values.type) return null;

    return (
        <InputContainer label={values.type} md='12'>
            {(values.type == 'Certificado') ? (
                <Box marginTop='1rem'>
                    <UploadFileButton
                        source="file"
                        loading={loading}
                        accept="application/pdf"
                    />
                </Box>
            ) : (
                <Box marginTop='1rem'>
                    <ImageInput
                        source="file"
                        loading={loading}
                        accept='image/svg+xml,image/png'
                    />
                    <Box width='16rem'>
                        <Box fontSize='14px' fontWeight='400' color='#6D6D6D' margin='1rem 0'>
                            El ícono debe tener una dimensión de 500 x 500 píxeles. Formato PNG o SVG.
                        </Box>
                    </Box>
                </Box>
            )}
        </InputContainer>
    )
}
