import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import {
    CreateButton,
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';

import GridList from './GridList';

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath="/trivias" />
    </TopToolbar>
);

const TriviaList = (props) => (
    <ListBase
        perPage={20}
        sort={{ field: 'reference', order: 'ASC' }}
        {...props}
    >
        <TriviaListView />
    </ListBase>
);

const TriviaListView = () => (
    <>
        <Typography variant='h5'>
            Trivias
        </Typography>
        <FilterContext.Provider>
            <ListActions />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <GridList />
                <Pagination rowsPerPageOptions={[10, 20, 40]} />
            </Box>
        </Box>
    </>
);

export default TriviaList;
