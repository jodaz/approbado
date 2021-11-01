import * as React from 'react';
import { Box } from '@material-ui/core';
import {
    CreateButton,
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import AwardsCard from './AwardsCard'

const ListActions = ({ trivia_id }) => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath={`/trivias/${trivia_id}/awards`} />
    </TopToolbar>
);

const AwardsList = ({ record, ...rest }) => (
    <ListBase
        resource='awards'
        basePath='awards'
        perPage={20}
        filter={{ trivia_id: record.id }}
        sort={{ field: 'reference', order: 'ASC' }}
        {...rest}
    >
        <AwardsListView trivia_id={record.id} />
    </ListBase>
);

const AwardsListView = ({ trivia_id }) => (
    <>
        <FilterContext.Provider>
            <ListActions trivia_id={trivia_id} />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <GridList component={<AwardsCard />} />
                <Pagination rowsPerPageOptions={[5, 10, 20]} />
            </Box>
        </Box>
    </>
);

export default AwardsList;
