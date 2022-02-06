import BlacklistedUserCard from './BlacklistedUserCard'
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import ListContainer from '../components/ListContainer'

const user = {
    id: 1,
    user_name: '@test',
    names: 'Test user',
    picture: 'public/default/user.png'
}

const BlacklistedUsersList = ({ record, ...rest }) => (
    <ListBase
        resource='users'
        basePath='users'
        perPage={20}
        filter={{ in_blacklist: false }} // false para blacklist, true para restricted
        sort={{ field: 'created_at', order: 'ASC' }}
        {...rest}
    >
        <BlacklistedUsersListView />
    </ListBase>
);

const BlacklistedUsersListView = () => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <TopToolbar>
                    <FilterLiveSearch source="title" />
                </TopToolbar>
            </FilterContext.Provider>
        }
        list={<GridList component={<BlacklistedUserCard />} />}
    />
);

export default BlacklistedUsersList
