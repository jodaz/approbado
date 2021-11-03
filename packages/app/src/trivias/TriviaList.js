import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import {
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import TriviaCard from './TriviaCard'

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
    </TopToolbar>
);

const TriviaList = (props) => (
    <ListBase
        basePath='trivias'
        resource='trivias'
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
                <GridList component={<TriviaCard />} />
            </Box>
        </Box>
    </>
);

export default TriviaList;
