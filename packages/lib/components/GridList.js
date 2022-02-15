import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useListContext } from 'react-admin';
import Spinner from '@approbado/lib/components/Spinner'
import EmptyMessageComponent from '@approbado/lib/components/EmptyMessageComponent'

const LoadedGridList = props => {
    const { component } = props
    const { ids, data, total } = useListContext()

    if (!ids || !data || !total) return <EmptyMessageComponent message='Sin registros' />;

    return (
        <Grid container>
            {ids.map((id, i) => (
                <Grid item xs={12} sm={6} md={4}>
                    {React.cloneElement(component, {
                        data: data[id],
                        id: id,
                        index: i,
                        key: id
                    })}
                </Grid>
            ))}
        </Grid>
    );
};

const GridList = props => {
    const { component } = props;
    const { loaded } = useListContext();

    return loaded ? (
        <LoadedGridList
            component={component}
        />
    ) : (
        <Box display="flex">
            <Spinner />
        </Box>
    );
};

GridList.defaultProps = {
    component: <></>
}

export default GridList;
