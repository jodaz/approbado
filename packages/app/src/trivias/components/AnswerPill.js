import Box from '@material-ui/core/Box'
import { fade } from '@material-ui/core'
import PropTypes from 'prop-types'


const AnswerPill = ({
    variant,
    children
}) => {
    let color = (variant == 'success') ? '#00B94A': '#E02340';

    return (
        <Box sx={{
            backgroundColor: fade(color, 0.12),
            color: color,
            borderRadius: '6px',
            padding: '0.5rem 0.6rem',
            fontSize: '0.9rem',
            width: 'max-content',
            fontWeight: 600
        }}>
            {children}
        </Box>
    )
}

AnswerPill.defaultProps = {
    variant: 'success'
}

AnswerPill.propTypes = {
    variant: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([ 'success', 'danger' ]),
    ])
}

export default AnswerPill
