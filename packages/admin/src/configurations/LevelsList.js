import {
    Datagrid,
    TextField,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin'
import DatagridOptions from '../components/DatagridOptions';
import CreateButton from '../components/CreateButton'
import DatagridListView from '@approbado/lib/components/DatagridListView'
import { ColorField } from 'react-admin-color-input';

const LevelsDatagrid = props => (
    <Datagrid optimized>
        <TextField label='#ID' source="id" />
        <TextField label='Nombre' source="name" />
        <ColorField source='color' label='Color' />
        <DatagridOptions
            basePath='configurations/levels'
            confirmTitle='Eliminar nivel'
            confirmContent='¿Está seguro que desea eliminar este nivel?'
        />
    </Datagrid>
);

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" label='' />
        <CreateButton basePath="/configurations/levels" />
    </TopToolbar>
);

const LevelList = props => (
    <ListBase
        perPage={10}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...props}
    >
        <DatagridListView actions={<ListActions />} datagrid={<LevelsDatagrid />} />
    </ListBase>
);

LevelList.defaultProps = {
    basePath: 'configurations/levels',
    resource: 'configurations/levels'
}

export default LevelList
