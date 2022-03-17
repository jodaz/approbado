import React from 'react';
import AwardItem from './AwardItem'
import Spinner from '@approbado/lib/components/Spinner'
import { axios, history } from '@approbado/lib/providers'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import { useSubthemeState } from '@approbado/lib/hooks/useSubthemeSelect';

export default function TemaryList({ id }) {
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])
    const [error, setError] = React.useState(false)
    const state = useSubthemeState();

    React.useEffect(() => {
        setLoading(true)

        axios.get(`/awards/subthemes/${id}`)
            .then(res => {
                setData(res.data)
            })
            .catch(() => {
                setError(true)
            })

        setLoading(false)
    }, [id])

    if (loading) return <Spinner />

    if (error) return (
        <Box variant="subtitle1">
            Ha ocurrido un error.
        </Box>
    )

    if (!data.length) return (
        <Box variant="subtitle1">
            Esta trivia aún no posee subtemas
        </Box>
    )

    return (
        <Box sx={{
            minHeight: 'max-content'
        }}>
            <List>
                {data.map((item, key) => <AwardItem {...item} key={key} /> )}
            </List>
            <Box marginTop='2rem'>
                <Button
                    color='primary'
                    fullWidth
                    onClick={() => history.push('/trivias/start')}
                    disabled={!(state.length > 0)}
                >
                    Iniciar trivia
                </Button>
            </Box>
        </Box>
    );
}
