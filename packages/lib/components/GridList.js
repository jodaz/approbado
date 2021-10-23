import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { useListContext } from 'react-admin';

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
}));

const getColsForWidth = (width) => {
    if (width === 'xs') return 1;
    if (width === 'sm') return 2;
    if (width === 'md') return 3;
    return 3;
};

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = (props) => {
    const { width, nbItems = 9 } = props;
    const classes = useStyles();

    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {' '}
            {times(nbItems, key => (
                <GridListTile key={key}>
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};

const EmptyList = props => (
    React.cloneElement(props.emptyListMessage, {})
)

const LoadedGridList = props => {
    const { ids, data, total } = useListContext();
    if (!ids || !data || !total) return <EmptyList {...props} />;

    return (
        <Grid container>
            {ids.map((id, i) => (
                <Grid item xs={12} sm={6} md={4}>
                    {React.cloneElement(props.component, {
                        data: data[id],
                        id: id,
                        index: i
                    })}
                </Grid>
            ))}
        </Grid>
    );
};

const GridList = (props) => {
    const { width, component, emptyListMessage } = props;
    const { loaded } = useListContext();

    return loaded ? (
        <LoadedGridList width={width} component={component} emptyListMessage={emptyListMessage} />
    ) : (
        <LoadingGridList width={width} />
    );
};

GridList.defaultProps = {
    component: <></>,
    emptyListMessage: <></>
}

export default withWidth()(GridList);
