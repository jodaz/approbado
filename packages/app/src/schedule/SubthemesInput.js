import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useFormState, Field } from 'react-final-form'
import Select from './Select'
import LayerIcon from '@approbado/lib/icons/LayerIcon';
import { axios } from '@approbado/lib/providers'

const SubthemesInput = ({ submitting }) => {
    const { values: { trivia_id } } = useFormState();
    const [subthemes, setSubthemes] = React.useState([])

    const fetchSubthemes = React.useCallback(async (trivia) => {
        const { data: { data } } = await axios.get(`/subthemes?filter[trivia_id]=${trivia}`)
        setSubthemes(data)
    }, []);

    React.useEffect(() => {
        if (trivia_id) {
            fetchSubthemes(trivia_id);
        }
    }, [trivia_id])

    if (!trivia_id) return null;

    return (
        <InputContainer
            disabled={submitting}
            label="Tema"
            md={12}
            xs={12}
        >
            <Field
                component={Select}
                name='subtheme_id'
                options={subthemes}
                icon={<LayerIcon />}
            />
        </InputContainer>
    )
}

export default SubthemesInput
