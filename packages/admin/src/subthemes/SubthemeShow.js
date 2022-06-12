import * as React from 'react';
import { axios } from '@approbado/lib/providers';
import { useHistory, useParams } from 'react-router-dom'
import LayerIcon from '@approbado/lib/icons/LayerIcon'
import DeleteButton from '@approbado/lib/components/DeleteButton'
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import Admin from '../layouts/Admin';
import TabbedList from '@approbado/lib/components/TabbedList'
import { ReactComponent as More } from '@approbado/lib/icons/More.svg'
import Header from '../components/Header'
import Box from '@material-ui/core/Box'

const OptionsMenu = props => {
    const history = useHistory();
    const { trivia_id } = props;

    return (
        <OptionsCardMenu icon={<More />}>
            <DeleteButton
                basePath='subthemes'
                confirmColor='warning'
                confirmTitle='Eliminar subtema'
                confirmContent={'¿Está seguro que desea eliminar este subtema?'}
                label={'Eliminar'}
                customAction={() => history.push(`/trivias/${trivia_id}/show`)}
                {...props}
            />
        </OptionsCardMenu>
    )
};

const tags = record => ([
    {
        name: 'Preguntas',
        pathname: `/trivias/${record.trivia_id}/subthemes/${record.id}/questions`,
    },
    {
        name: 'General',
        pathname: `/trivias/${record.trivia_id}/subthemes/${record.id}`
    }
])

const SubthemeShow = ({ children }) => {
    const { subtheme_id, trivia_id } = useParams();
    const [record, setRecord] = React.useState(null)

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/subthemes/${subtheme_id}`);

        setRecord(data);
    }, []);

    React.useEffect(() => {
        fetchRecord();
    }, [])

    if (!record) return null;

    return (
        <Admin>
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
                {React.Children.map(children, child => (
                    React.cloneElement(child, {
                        record: record
                    })
                ))}
            </Box>
        </Admin>
    )
}

export default SubthemeShow;
