import * as React from 'react';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import AwardsCard from './AwardsCard'
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

const ListActions = ({ trivia_id }) => (
    <TopToolbar>
        <FilterLiveSearch source="global_search" />
        <CreateButton basePath={`/trivias/${trivia_id}/awards`} />
    </TopToolbar>
);

const AwardsList = ({ record, ...rest }) => (
    <ListBase
        resource='awards'
        basePath='awards'
        perPage={20}
        filter={{ trivia_id: record.id }}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...rest}
    >
        <AwardsListView trivia_id={record.id} />
    </ListBase>
);

const AwardsListView = ({ trivia_id }) => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions trivia_id={trivia_id} />
            </FilterContext.Provider>
        }
        list={<GridList component={<AwardsCard />} />}
    />
);

export default AwardsList;
