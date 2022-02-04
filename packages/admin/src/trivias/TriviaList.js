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
import CreateButton from '../components/CreateButton'

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath="/trivias" />
    </TopToolbar>
);

const TriviaList = (props) => (
    <ListBase
        perPage={20}
        sort={{ field: 'created_at', order: 'DESC' }}
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
                <Pagination rowsPerPageOptions={[5, 10, 20]} />
            </Box>
        </Box>
    </>
);

export default TriviaList;
