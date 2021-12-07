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
import QuestionCard from './QuestionCard'

const ListActions = ({ id, trivia_id }) => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath={`/trivias/${trivia_id}/subthemes/${id}/questions`} />
    </TopToolbar>
);

const QuestionListView = (record) => (
    <>
        <FilterContext.Provider>
            <ListActions {...record} />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <GridList component={<QuestionCard />} />
                <Pagination rowsPerPageOptions={[5, 10, 20]} />
            </Box>
        </Box>
    </>
);

const QuestionList = ({ record, ...rest }) => (
    <ListBase
        resource='questions'
        basePath='questions'
        perPage={20}
        filter={{ subtheme_id: record.id }}
        {...rest}
    >
        <QuestionListView {...record} />
    </ListBase>
);

export default QuestionList;
