import { 
    Datagrid,
    TextField,
    ReferenceManyField,
    Pagination,
    Filter,
    useRedirect,
    TopToolbar,
    TextInput
} from 'react-admin'
import Button from '@material-ui/core/Button'
import EditButton from '../components/EditButton'

const CategoriesFilter = props => (
    <Filter {...props}>
        <TextInput label="Buscar" source='name' alwaiesOn />
    </Filter>
);

const CategoriesDatagrid = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
        <EditButton />
    </Datagrid>
);

const CategoryList = (props) => {
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
