import { 
    Datagrid,
    TextField,
    ListProps,
    ReferenceManyField,
    Pagination,
    Filter,
    useRedirect,
    TopToolbar,
    TextInput
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
    </Datagrid>
);

const LevelList = (props) => {
    const redirect = useRedirect();

    return (
        <ReferenceManyField
            addLabel={false}
            reference='levels'
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
