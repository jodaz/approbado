import {
    Datagrid,
    TextField,
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar
} from 'react-admin'
import Box from '@material-ui/core/Box'
import DatagridOptions from '../components/DatagridOptions';
import CreateButton from '../components/CreateButton'

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

const CategoryListView = props => (
    <>
        <FilterContext.Provider>
            <ListActions />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <CategoriesDatagrid />
                <Pagination rowsPerPageOptions={[5, 10, 25]} />
            </Box>
        </Box>
    </>
);

CategoryList.defaultProps = {
    basePath: 'configurations/categories',
    resource: 'configurations/categories'
}

export default CategoryList
