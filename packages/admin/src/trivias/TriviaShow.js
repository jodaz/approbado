import * as React from 'react';
import BalanceIcon from '@approbado/lib/icons/BalanceIcon'
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box';
import Header from '../components/Header'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import Admin from '../layouts/Admin';
import { axios } from '@approbado/lib/providers';
import { useHistory, useParams } from 'react-router-dom'
import Spinner from '@approbado/lib/components/Spinner'

const tags = id => ([
    {
        name: 'Subtemas',
        pathname: `/trivias/${id}/subthemes`
    },
    {
        name: 'Archivos',
        pathname: `/trivias/${id}/files`
    },
    {
        name: 'Premios',
        pathname: `/trivias/${id}/awards`
    },
    {
        name: 'Preguntas',
        pathname: `/trivias/${id}/questions`,
    },
    {
        name: 'General',
        pathname: `/trivias/${id}`
    },
])

const OptionsMenu = props => {
    const history = useHistory();

    return (
        <OptionsCardMenu icon={<More />}>
            <DeleteButton
                basePath='trivias'
                confirmColor='warning'
                confirmTitle='Eliminar trivia'
                confirmContent={'¿Está seguro que desea eliminar esta trivia?'}
                label={'Eliminar'}
                customAction={() => history.push('/trivias')}
                {...props}
            />
        </OptionsCardMenu>
    )
};

const TriviaShow = ({ children }) => {
    const { id } = useParams();
    const [record, setRecord] = React.useState({})

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/trivias/${id}`)

        setRecord(data)
    }, [])

    React.useEffect(() => {
        fetchRecord();
    }, [])

    if (!Object.entries(record).length) return <Spinner />;

    return (
        <Admin>
            <Box display="flex" marginTop="2rem" flexDirection='column'>
                <Header
                    record={record}
                    icon={<BalanceIcon />}
                    name='Trivia'
                    menu={<OptionsMenu record={record} />}
                />
                <TabbedList
                    tags={tags(id)}
                />
                {React.Children.map(children, child => (
                    React.cloneElement(child, {
                        record: record
                    })
                ))}
            </Box>
        </Admin>
    )
}

export default TriviaShow;
