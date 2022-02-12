import * as React from 'react';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import FileCard from './FileCard'
import CreateButton from '../components/CreateButton'
import ListContainer from '../components/ListContainer'

const ListActions = ({ trivia_id }) => (
    <TopToolbar>
        <FilterLiveSearch source="global_search" />
        <CreateButton basePath={`/trivias/${trivia_id}/files`} />
    </TopToolbar>
);

const FileList = ({ record, ...rest }) => (
    <ListBase
        resource='files'
        basePath='files'
        perPage={10}
        filter={{ trivia_id: record.id }}
        {...rest}
    >
        <FileListView trivia_id={record.id} />
    </ListBase>
);

const FileListView = ({ trivia_id }) => (
    <ListContainer
        actions={
            <FilterContext.Provider>
                <ListActions trivia_id={trivia_id} />
            </FilterContext.Provider>
        }
        list={<GridList component={<FileCard />} />}
    />
);

export default FileList;
