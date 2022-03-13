import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tag from './Tag'

export default ({ items }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row'
    }}>
        {items.map((item, i) => (
            <Tag key={i} name={item.name} />
        ))}
    </Box>
);
