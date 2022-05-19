import Box from '@material-ui/core/Box'

const ErrorMessage = ({ children }) => (
    <Box fontWeight={300}>
        {children}
    </Box>
)

ErrorMessage.defaultProps = {
    children: 'Ha ocurrido un error en su solicitud.'
}

export default ErrorMessage
