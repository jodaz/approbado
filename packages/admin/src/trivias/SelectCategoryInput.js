import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { axios } from '@approbado/lib/providers'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SelectCategoryInput = ({ disabled }) => {
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/configurations/categories')
        setOptions(data)
    }, []);

    React.useEffect(() => {
        fetchOptions();
    }, [])

    return (
        <InputContainer
            disabled={disabled}
            label="Categoría"
            md={6}
            xs={12}
        >
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='category_id'
                    options={options}
                />
            )}
        </InputContainer>
    )
}

export default SelectCategoryInput
