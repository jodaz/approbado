import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import TriviaCard from './TriviaCard'
import SelectTrivia from './SelectTrivia'
import { useMediaQuery } from '@material-ui/core'

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

const TriviaListView = () => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )

    return (
        <>
            <Typography variant='h5'>
                Trivias
            </Typography>
            <FilterContext.Provider>
                <ListActions />
            </FilterContext.Provider>
            <Box display="flex" width={'100%'}>
                <Box width={'80%'}>
                    <GridList component={<TriviaCard />} />
                </Box>
                <Box width={'20%'}>
                    <SelectTrivia isXSmall={isXSmall} />
                </Box>
            </Box>
        </>
    );
}

export default TriviaList;
