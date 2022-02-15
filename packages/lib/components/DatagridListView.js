import * as React from 'react'
import { FilterContext, useListContext } from 'react-admin'
import ListContainer from '../components/ListContainer'
import EmptyMessageComponent from '@approbado/lib/components/EmptyMessageComponent'
import Spinner from '@approbado/lib/components/Spinner'

const DatagridListView = ({ datagrid, actions }) => {
    const { loading, total, ids, data } = useListContext();

    if (loading) return <Spinner />;

    return (
        <ListContainer
            actions={
                <FilterContext.Provider>
                    {actions}
                </FilterContext.Provider>
            }
            list={(!ids || !data || !total)
                ? <EmptyMessageComponent message='Sin registros'  />
                : <>{datagrid}</>
            }
        />
    )
};

export default DatagridListView
