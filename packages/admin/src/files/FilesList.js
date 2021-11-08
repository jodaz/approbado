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
import FileCard from './FileCard'

const ListActions = ({ trivia_id }) => (
    <TopToolbar>
        <FilterLiveSearch source="name" />
        <CreateButton basePath={`/trivias/${trivia_id}/files`} />
    </TopToolbar>
);

const FileList = ({ record, ...rest }) => (
    <ListBase
        resource='files'
        basePath='files'
        perPage={20}
        filter={{ trivia_id: record.id }}
        sort={{ field: 'reference', order: 'ASC' }}
        {...rest}
    >
        <FileListView trivia_id={record.id} />
    </ListBase>
);

const FileListView = ({ trivia_id }) => (
    <>
        <FilterContext.Provider>
            <ListActions trivia_id={trivia_id} />
        </FilterContext.Provider>
        <Box display="flex">
            <Box width={'100%'}>
                <GridList component={<FileCard />} />
                <Pagination rowsPerPageOptions={[5, 10, 20]} />
            </Box>
        </Box>
    </>
);

export default FileList;
