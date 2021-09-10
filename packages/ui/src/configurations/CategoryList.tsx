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

const CategoriesFilter: React.FC = props => (
    <Filter {...props}>
        <TextInput label="Buscar" source='name' alwaiesOn />
    </Filter>
);

const CategoriesDatagrid: React.FC = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
    </Datagrid>
);

const CategoryList = (props: ListProps) => {
    const redirect = useRedirect();
    return (
        <ReferenceManyField
            addLabel={false}
            reference='categories'
            target='id'
            sort={{ field: 'created_at', order: 'DESC' }}
            perPage={10}
        >
            <>
                <TopToolbar>
                    <Button onClick={() => redirect('/configurations/categories/create')}>
                        Crear
                    </Button>
                </TopToolbar>
                <CategoriesDatagrid />
                <Pagination />
            </>
        </ReferenceManyField>
    );
}

export default CategoryList
