import * as React from 'react';
import { useState } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import EyeIcon from '@approbado/lib/icons/EyeIcon';
import EyeOffIcon from '@approbado/lib/icons/EyeOffIcon';
import TextInput from './TextInput';

const PasswordInput = ({
    initiallyVisible = false,
    ...rest
}) => {
    const [visible, setVisible] = useState(initiallyVisible);

    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <TextInput
            type={visible ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                visible
                                    ? 'Mostrar'
                                    : 'Ocultar'
                            }
                            onClick={handleClick}
                            size="large"
                        >
                            {visible ? <EyeIcon /> : <EyeOffIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
};

export default PasswordInput
