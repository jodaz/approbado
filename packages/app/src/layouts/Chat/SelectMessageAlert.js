import Box from '@material-ui/core/Box'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as MessageIllustration } from '@approbado/lib/illustrations/Messages.svg'

const SelectMessageBanner = () => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }}>
        <NoContent
            icon={<MessageIllustration />}
            title={
                <Box sx={{ textAlign: 'center' }}>
                    Selecciona un mensaje
                    <Box fontWeight={400}>
                        Selecciona un mensaje para iniciar la conversación.
                    </Box>
                </Box>
            }
        />
    </Box>
)

export default SelectMessageBanner
