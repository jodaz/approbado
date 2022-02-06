import * as React from 'react';
import { useRedirect, useShowController } from 'react-admin'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon'
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box';
import Header from '../components/Header'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'

// Components
import TriviaEdit from './TriviaEdit'
import SubthemesList from '../subthemes/SubthemesList'
import AwardsList from '../awards/AwardsList'
import FilesList from '../files/FilesList'
import QuestionsList from '../questions/QuestionsList'

const tags = record => ([
    {
        name: 'Subtemas',
        pathname: 'subthemes',
        component: <SubthemesList record={record} />
    },
    {
        name: 'Archivos',
        pathname: 'files',
        component: <FilesList record={record} />
    },
    {
        name: 'Premios',
        pathname: 'awards',
        component: <AwardsList record={record} />
    },
    {
        name: 'Preguntas',
        pathname: 'questions',
        component: <QuestionsList record={record} filter={{ trivia_id: record.id }} />
    },
    {
        name: 'General',
        pathname: 'general',
        component: <TriviaEdit record={record} />
    },
])

const OptionsMenu = props => {
    const redirect = useRedirect();

    return (
        <OptionsCardMenu icon={<More />}>
            <DeleteButton
                basePath='trivias'
                confirmColor='warning'
                confirmTitle='Eliminar trivia'
                confirmContent={'¿Está seguro que desea eliminar esta trivia?'}
                label={'Eliminar'}
                customAction={() => redirect('/trivias')}
                {...props}
            />
        </OptionsCardMenu>
    )
};

const TriviaShow = props => {
    const showControllerProps = useShowController(props)

    const { record, loaded } = showControllerProps

    if (!loaded) return null;

    return (
        <Box display="flex" marginTop="2rem" flexDirection='column'>
            <Header
                record={record}
                icon={<BalanceIcon />}
                name='Trivia'
                menu={<OptionsMenu record={record} />}
            />
            <TabbedList
                tags={tags(record)}
            />
        </Box>
    )
}

export default TriviaShow;
