import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import TriviaCard from './TriviaCard'
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch source="name" label='' />
        <CreateButton basePath="/trivias" />
    </TopToolbar>
);

const TriviaList = props => (
    <ListBase
        perPage={10}
        sort={{ field: 'created_at', order: 'DESC' }}
        {...props}
    >
        <TriviaListView />
    </ListBase>
);

const TriviaListView = () => (
    <ListContainer
        title={
            <Typography variant='h5'>
                Trivias
            </Typography>
        }
        actions={
            <FilterContext.Provider>
                <ListActions />
            </FilterContext.Provider>
        }
        list={
            <GridList component={<TriviaCard />} />
        }
    />
);

export default TriviaList;
