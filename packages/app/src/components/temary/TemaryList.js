import React from 'react';
import Typography from '@material-ui/core/Typography'
import AwardItem from './AwardItem'
import Spinner from '@approbado/lib/components/Spinner'
import { axios } from '@approbado/lib/providers'
import SubthemeItem from './SubthemeItem'

export default function TemaryList({ id }) {
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])
    const [checked, setChecked] = React.useState([1]);
    const [error, setError] = React.useState(false)

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

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
        <Typography variant="subtitle1">
            Ha ocurrido un error.
        </Typography>
    )

    if (!data.length) return (
        <Typography variant="subtitle1">
            Sin recursos
        </Typography>
    )

    return (
        <>
            {data.map(item => {
                const { subthemes, ...rest } = item

                return (
                    <>
                        <AwardItem {...rest} />
                        {subthemes.map(subtheme => (
                            <SubthemeItem {...subtheme} />
                        ))}
                    </>
                )
            })}
        </>
    );
}
