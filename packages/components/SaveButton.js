import { SaveButton } from 'react-admin'

const AddButton = ({ handleSubmit, saving, ...rest }) => (
    <SaveButton
        handleSubmitWithRedirect={handleSubmit}
        icon={<></>}
        saving={saving}
        {...rest}
    />
)

AddButton.defaultProps = {
    label: 'Guardar'
}

export default AddButton