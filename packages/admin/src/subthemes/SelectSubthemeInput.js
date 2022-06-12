import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { axios } from '@approbado/lib/providers'
import SelectInput from '@approbado/lib/components/SelectInput'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'

const SelectSubthemeInput = ({ disabled }) => {
    const { trivia_id } = useParams()
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { data: { data } } = await axios.get(`awards?filter%5Btrivia_id%5D=${trivia_id}`)
        setOptions(data)
    }, []);

    React.useEffect(() => {
        fetchOptions();
    }, [])

    return (
        <InputContainer disabled={disabled} label="Premio" md={6} xs={6}>
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='award_id'
                    placeholder='Premio'
                    options={options}
                    property='title'
                />
            )}
        </InputContainer>
    )
}

export default SelectSubthemeInput
