import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { axios } from '@approbado/lib/providers'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'
import IdeaIcon from '@approbado/lib/icons/IdeaIcon'

const SubthemesInput = ({ submitting }) => {
    const [levels, setLevels] = React.useState([])

    const fetchLevels = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/configurations/levels')
        setLevels(data)
    }, []);

    React.useEffect(() => {
        fetchLevels();
    }, [])

    if (!Object.entries(levels).length) return null;

    return (
        <InputContainer
            disabled={submitting}
            label="Nivel"
            md={12}
            xs={12}
        >
            <SelectInput
                name='level_id'
                options={levels}
                inputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <IdeaIcon />
                        </Box>
                    )
                }}
            />
        </InputContainer>
    )
}

export default SubthemesInput
