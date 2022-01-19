import * as React from 'react';
import { Box } from '@material-ui/core';
import {
    FilterContext,
    ListBase,
    Pagination,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import QuestionCard from './QuestionCard'
import AddQuestionsDialog from './AddQuestionsDialog'

const ListActions = props => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        {props.trivia_id && <AddQuestionsDialog {...props} />}
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

const QuestionList = ({ record, filter, ...rest }) => (
    <ListBase
        resource='questions'
        basePath='questions'
        perPage={20}
        filter={{ ...filter, options: true }}
        {...rest}
    >
        <QuestionListView {...record} />
    </ListBase>
);

export default QuestionList;
