import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar
} from 'react-admin'
import GridList from '@approbado/lib/components/GridList';
import MembershipCard from './MembershipCard'
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath="/memberships/plans" />
    </TopToolbar>
);

const PlansList = props => (
    <ListBase
        perPage={20}
        sort={{ field: 'amount', order: 'DESC' }}
        {...props}
    >
        <PlansListView />
    </ListBase>
);

const PlansListView = () => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions />
            </FilterContext.Provider>
        }
        list={<GridList component={<MembershipCard />} />}
    />
);

PlansList.defaultProps = {
    basePath: 'memberships/plans',
    resource: 'memberships/plans'
}

export default PlansList
