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

const CategoriesFilter = props => (
    <Filter {...props}>
        <TextInput label="Buscar" source='name' alwaiesOn />
    </Filter>
);

const CategoriesDatagrid = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
        <EditButton basePath='configurations/categories' />
    </Datagrid>
);

const CategoryList = (props) => {
    const redirect = useRedirect();
    return (
        <ReferenceManyField
            addLabel={false}
            reference='configurations/categories'
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
