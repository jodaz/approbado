import {
    Datagrid,
    TextField,
    ListBase,
    FilterLiveSearch,
    TopToolbar
} from 'react-admin'
import DatagridOptions from '../components/DatagridOptions';
import CreateButton from '../components/CreateButton'
import DatagridListView from '@approbado/lib/components/DatagridListView'

const CategoriesDatagrid = () => (
    <Datagrid optimized>
        <TextField label='Nombre' source="name" />
        <DatagridOptions
            basePath='configurations/categories'
            confirmTitle='Eliminar categoría'
            confirmContent='¿Está seguro que desea eliminar esta categoría?'
        />
    </Datagrid>
);

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" label='' />
        <CreateButton label="Crear" basePath="/configurations/categories" />
    </TopToolbar>
);

const CategoryList = props => (
    <ListBase
        perPage={10}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...props}
    >
        <DatagridListView actions={<ListActions />} datagrid={<CategoriesDatagrid />} />
    </ListBase>
);

CategoryList.defaultProps = {
    basePath: 'configurations/categories',
    resource: 'configurations/categories'
}

export default CategoryList
