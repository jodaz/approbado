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

const LevelsFilter: React.FC = props => (
    <Filter {...props}>
      <TextInput label="Buscar" source='name' alwaysOn />
    </Filter>
);

const LevelsDatagrid: React.FC = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
    </Datagrid>
);

const LevelList = (props: ListProps) => {
    const redirect = useRedirect();
    return (
        <ReferenceManyField
            addLabel={false}
            reference={'levels'}
            target='id'
            sort={{ field: 'created_at', order: 'DESC' }}
            perPage={10}
        >
            <>
                <TopToolbar>
                    <LevelsFilter />
                    <Button onClick={() => redirect('/configurations/levels/create')}>
                        Crear
                    </Button>
                </TopToolbar>
                <LevelsDatagrid />
                <Pagination />
            </>
        </ReferenceManyField>
    );
}

export default LevelList