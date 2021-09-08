import {
    Create,
    SimpleForm,
    TextInput,
    CreateProps
} from 'react-admin'

const LevelCreate = (props: CreateProps) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" label="Nivel" />
            </SimpleForm>
        </Create>
    )
}

export default LevelCreate