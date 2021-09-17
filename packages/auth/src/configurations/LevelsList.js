import { 
    Datagrid,
    TextField,
    ReferenceManyField,
    Pagination,
    Filter,
    useRedirect,
    TopToolbar,
    TextInput,
    EditButton
} from 'react-admin'
import Button from '@material-ui/core/Button'

const LevelsFilter = props => (
    <Filter {...props}>
        <TextInput label="Buscar" source='name' alwaysOn />
    </Filter>
);

const LevelsDatagrid = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
        <EditButton basePath='configurations/levels' />
    </Datagrid>
);

const LevelList = (props) => {
    const redirect = useRedirect();

    return (
        <ReferenceManyField
            addLabel={false}
            reference='configurations/levels'
            target='id'
            sort={{ field: 'created_at', order: 'DESC' }}
            perPage={10}
        >
            <>
                <TopToolbar>
                    <LevelsFilter />
                    <Button onClick={() => redirect('/configurations/levels/create')}>
                        Agregar nivel
                    </Button>
                </TopToolbar>
                <LevelsDatagrid />
                <Pagination />
            </>
        </ReferenceManyField>
    );
}

export default LevelList
