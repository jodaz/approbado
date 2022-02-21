import * as React from 'react';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import QuestionCard from './QuestionCard'
import AddQuestionsDialog from './AddQuestionsDialog'
import Pagination from '@approbado/lib/components/Pagination';

const ListActions = props => (
    <TopToolbar>
        <FilterLiveSearch source="global_search" label='' />
        {props.trivia_id && <AddQuestionsDialog {...props} />}
    </TopToolbar>
);

const QuestionListView = (record) => (
    <>
        <FilterContext.Provider>
            <ListActions {...record} />
        </FilterContext.Provider>
        <GridList component={<QuestionCard />} />
        <Pagination />
    </>
);

const QuestionList = ({ record, filter, ...rest }) => (
    <ListBase
        resource='questions'
        basePath='questions'
        perPage={10}
        filter={{ ...filter, options: true, onlyTrueOptions: true }}
        {...rest}
    >
        <QuestionListView {...record} />
    </ListBase>
);

export default QuestionList;
