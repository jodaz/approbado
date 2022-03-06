import * as React from 'react';
import Box from '@material-ui/core/Box';
import { ReactComponent as SelectionIllustration } from '@approbado/lib/illustrations/Selection.svg';
import NoContent from '@approbado/lib/components/NoContent'

const SelectTrivia = () => (
    <Box sx={{
        width: '20%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }}>
        <NoContent
            icon={<SelectionIllustration />}
            title='Seleccione una trivia'
        />
    </Box>
)

export default SelectTrivia
