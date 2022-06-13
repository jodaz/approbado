import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { axios } from '@approbado/lib/providers'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@approbado/lib/icons/CloseIcon'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    userCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    chip: {
        padding: '4px 4px 4px 8px !important',
        backgroundColor: '#EAEAEA !important',
        borderRadius: '6px',
        fontWeight: 600,
        color: theme.palette.info.dark
    }
}))

const SelectCategoriesInput = ({ submitting }) => {
    const classes = useStyles();
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/configurations/categories')
        setOptions(data)
    }, []);

    React.useEffect(() => {
        fetchOptions();
    }, [])

    if (!Object.entries(options).length) return null;

    return (
        <InputContainer
            disabled={submitting}
            label="Etiquetas"
            md={6}
            xs={12}
        >
            <SelectInput
                name='categories_ids'
                options={options}
                multiple
                renderOption={(option, { selected }) => (
                    <Box className={classes.userCard}>
                        <Box className={classes.userInfo}>
                            <Box sx={{
                                fontSize: '0.9rem',
                                fontSize: '1rem',
                                fontWeight: 600
                            }}>
                                {option.name}
                            </Box>
                        </Box >
                    </Box>
                )}
                getOptionSelected={(option, value) => option.name === value.name}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option.name}
                            size="small"
                            classes={{ root: classes.chip }}
                            deleteIcon={<CloseIcon />}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                    />
                )}
            />
        </InputContainer>
    )
}

export default SelectCategoriesInput
