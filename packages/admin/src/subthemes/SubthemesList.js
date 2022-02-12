import * as React from 'react';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import SubthemeCard from './SubthemeCard'
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

const ListActions = ({ trivia_id }) => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath={`/trivias/${trivia_id}/subthemes`} />
    </TopToolbar>
);

const SubthemeList = ({ record, ...rest }) => (
    <ListBase
        resource='subthemes'
        basePath='subthemes'
        perPage={20}
        filter={{ trivia_id: record.id }}
        sort={{ field: 'created_at', order: 'ASC' }}
        {...rest}
    >
        <SubthemeListView trivia_id={record.id} />
    </ListBase>
);

const SubthemeListView = ({ trivia_id }) => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions trivia_id={trivia_id} />
            </FilterContext.Provider>
        }
        list={<GridList component={<SubthemeCard />} />}
    />
);

export default SubthemeList;
