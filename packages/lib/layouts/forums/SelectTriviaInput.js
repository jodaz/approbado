import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { axios } from '@approbado/lib/providers'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SelectTriviaInput = ({ disabled }) => {
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { data: { data } } = await axios.get(`trivias`)
        setOptions(data)
    }, []);

    React.useEffect(() => {
        fetchOptions();
    }, [])

    return (
        <InputContainer disabled={disabled} label="Trivia" xs={12} md={6}>
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='trivia_id'
                    placeholder='Trivia'
                    options={options}
                />
            )}
        </InputContainer>
    )
}

export default SelectTriviaInput
