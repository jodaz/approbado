import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    CreateProps
} from 'react-admin'

const ACCESS_TYPES = [
    { id: 'administrador', name: 'Administrador' },
    { id: 'pagos', name: 'Pagos' },
    { id: 'moderador', name: 'Moderador' }
]

const UserCreate = (props: CreateProps) => {
    return (
        <Create title="Create a Post" {...props}>
            <SimpleForm>
                <TextInput label='Nombre' source="name" />
		<TextInput label='Contraseña' source='password' />
                <TextInput label="Correo" source="email" />
                <SelectInput label="Tipo de acceso" source="access" choices={ACCESS_TYPES} />
            </SimpleForm>
        </Create>
    )
}

export default UserCreate
