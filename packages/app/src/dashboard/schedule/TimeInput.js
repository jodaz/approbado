import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import Box from '@material-ui/core/Box'
import TimeIcon from '@approbado/lib/icons/TimeIcon'
import formatString from "format-string-by-pattern";

const formatTime = value => {
    const formatter = value.slice(0, 5).replace(/[^\d]/g, '')+value.slice(5, 8).toUpperCase();

    return formatString('99:99 am', formatter);
}

const DateInput = ({ submitting }) => (
    <InputContainer
        disabled={submitting}
        labelName="Hora"
        md={6}
        xs={6}
    >
        <TextInput
            name="time"
            placeholder='00:00 AM'
            parse={formatTime}
            InputProps={{
                startAdornment: (
                    <Box marginLeft='6px' display='flex'>
                        <TimeIcon />
                    </Box>
                )
            }}
        />
    </InputContainer>
)

export default DateInput
