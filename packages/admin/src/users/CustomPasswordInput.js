import PasswordInput from '@approbado/lib/components/PasswordInput'
import { useFormState } from 'react-final-form'
import InputContainer from '@approbado/lib/components/InputContainer'

const CustomPasswordInput = () => {
    const { values } = useFormState();

    if (!values.random_pass) {
        return (
            <InputContainer label='Nombre'>
                <PasswordInput
                    label={false}
                    name='password'
                    placeholder="Contraseña"
                    fullWidth
                />
            </InputContainer>
        )
    }

    return null;
}

export default CustomPasswordInput
