import {
    Datagrid,
    TextField,
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar
} from 'react-admin'
import DatagridOptions from '../components/DatagridOptions';
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

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
        <FilterLiveSearch source="name" />
        <CreateButton label="Crear" basePath="/configurations/categories" />
    </TopToolbar>
);

const CategoryList = props => (
    <ListBase
        perPage={20}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...props}
    >
        <CategoryListView {...props} />
    </ListBase>
);

const CategoryListView = () => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions />
            </FilterContext.Provider>
        }
        list={<CategoriesDatagrid />}
    />
);

CategoryList.defaultProps = {
    basePath: 'configurations/categories',
    resource: 'configurations/categories'
}

export default CategoryList
