import * as React from 'react';
import {
    useRedirect,
    useShowController
} from 'react-admin'
import { useParams } from 'react-router-dom'
import LayerIcon from '@approbado/lib/icons/LayerIcon'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import SubthemeEdit from './SubthemeEdit'
import TabbedList from '@approbado/lib/components/TabbedList'
import QuestionsList from '../questions/QuestionsList'
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import Header from '../components/Header'
import Box from '@material-ui/core/Box'

const OptionsMenu = props => {
    const redirect = useRedirect();
    const { trivia_id } = props;

    return (
        <OptionsCardMenu icon={<More />}>
            <DeleteButton
                basePath='subthemes'
                confirmColor='warning'
                confirmTitle='Eliminar subtema'
                confirmContent={'¿Está seguro que desea eliminar este subtema?'}
                label={'Eliminar'}
                customAction={() => redirect(`/trivias/${trivia_id}/show`)}
                {...props}
            />
        </OptionsCardMenu>
    )
};

const tags = record => ([
    {
        name: 'Preguntas',
        pathname: 'questions',
        component: <QuestionsList record={record} filter={{ subtheme_id: record.id }} />
    },
    {
        name: 'General',
        pathname: 'general',
        component: <SubthemeEdit record={record} />
    }
])

const SubthemeShow = () => {
    const { subtheme_id, trivia_id } = useParams();
    const showControllerProps = useShowController({
        basePath: 'subthemes',
        resource: 'subthemes',
        id: subtheme_id
    })

    const { record, loaded } = showControllerProps

    if (!loaded) return null;

    return (
        <Box marginTop='2rem'>
            <Header
                record={record}
                icon={<LayerIcon />}
                name='Subtema'
                menu={<OptionsMenu record={record} trivia_id={trivia_id} />}
            />

            <TabbedList
                tags={tags(record)}
            />
        </Box>
    )
}

export default SubthemeShow;
