import RestrictedUserCard from './RestrictedUserCard'
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import ListContainer from '../components/ListContainer'

const BlacklistedUsersList = props => (
    <ListBase
        resource='users'
        basePath='users'
        perPage={20}
        filter={{ in_blacklist: true }} // false para blacklist, true para restricted
        sort={{ field: 'created_at', order: 'ASC' }}
        {...props}
    >
        <BlacklistedUsersListView />
    </ListBase>
);

const BlacklistedUsersListView = () => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <TopToolbar>
                    <FilterLiveSearch source="global_search" />
                </TopToolbar>
            </FilterContext.Provider>
        }
        list={<GridList component={<RestrictedUserCard />} />}
    />
);

export default BlacklistedUsersList
