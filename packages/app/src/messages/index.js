import * as React from 'react'
import SelectMessageBanner from './components/SelectMessageBanner'
import Box from '@material-ui/core/Box'
import Drawer from './drawer'

const Index = () => (
    <Box sx={{
        display: 'flex',
        width: '100%',
        height: '100%'
    }}>
        <Drawer />
        <SelectMessageBanner />
    </Box>
);

export default Index;
