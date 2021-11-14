import * as React from 'react';
import Box from '@material-ui/core/Box';
import {
    ListBase
} from 'react-admin';
import GridList from '@approbado/lib/components/GridList';
import ForumCard from './ForumCard'

const ForumList = (props) => (
    <ListBase
        resource="forums"
        basePath="/forums"
        {...props}
    >
        <ForumListView />
    </ListBase>
);

const ForumListView = () => (
    <>
        <Box display="flex">
            <Box width={'100%'}>
                <GridList component={<ForumCard />} />
            </Box>
        </Box>
    </>
);

export default ForumList;
