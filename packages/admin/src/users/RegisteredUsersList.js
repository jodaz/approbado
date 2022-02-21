import {
    Datagrid,
    TextField,
    ListBase,
    DateInput,
    useListContext,
    TopToolbar,
    FilterLiveSearch
} from 'react-admin'
import { Form } from 'react-final-form';
import Box from '@material-ui/core/Box';
import GoToProfileButtonLink from '../components/GoToProfileButtonLink'
import DatagridListView from '@approbado/lib/components/DatagridListView'
import DownloadButton from '../components/DownloadButton'

const FormFilter = props => {
    const {
        filterValues,
        setFilters
    } = useListContext();

    const onSubmit = (values) => {
        if (Object.keys(values).length > 0) {
            setFilters(values);
        }
    };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={filterValues}
            {...props}
            render={ ({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Box component="span" mr={2}>
                            <FilterLiveSearch source="global_search" label='' />
                        </Box>
                        <Box component="span" mr={2}>
                            <DateInput source="gt_date" label="Desde" />
                        </Box>
                        <Box component="span" mr={2}>
                            <DateInput source="lt_date" label="Hasta" />
                        </Box>
                    </Box>
                </form>
            )}
        />
    );
};

const UsersDatagrid = props => (
    <Datagrid optimized>
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
        <GoToProfileButtonLink {...props} />
    </Datagrid>
)

const ListActions = props => (
    <TopToolbar>
        <FormFilter {...props} />
        <DownloadButton />
    </TopToolbar>
)

const RegisteredUsersList = props => (
    <ListBase
        perPage={15}
        sort={{ field: 'created_at', order: 'ASC' }}
        filter={{ is_registered: true }}
        {...props}
    >
        <DatagridListView actions={<ListActions />} datagrid={<UsersDatagrid />} />
    </ListBase>
);

RegisteredUsersList.defaultProps = {
    basePath: 'users',
    resource: 'users'
}

export default RegisteredUsersList;
