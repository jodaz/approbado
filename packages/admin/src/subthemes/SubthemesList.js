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
import SubthemeCard from './SubthemeCard'

const ListActions = ({ trivia_id }) => (
    <TopToolbar>
        <FilterLiveSearch source="title" />
        <CreateButton basePath={`/trivias/${trivia_id}/subthemes`} />
    </TopToolbar>
);

const SubthemeList = ({ record, ...rest }) => (
    <ListBase
        resource='subthemes'
        basePath='subthemes'
        perPage={20}
        filter={{ trivia_id: record.id }}
        sort={{ field: 'reference', order: 'ASC' }}
        {...rest}
    >
        <SubthemeListView trivia_id={record.id} />
    </ListBase>
);

const SubthemeListView = ({ trivia_id }) => (
    <>
        <FilterContext.Provider>
            <ListActions trivia_id={trivia_id} />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <GridList component={<SubthemeCard />} />
                <Pagination rowsPerPageOptions={[5, 10, 20]} />
            </Box>
        </Box>
    </>
);

export default SubthemeList;
