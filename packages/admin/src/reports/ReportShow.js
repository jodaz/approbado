import * as React from 'react'
import Box from '@material-ui/core/Box';
import Tag from '@approbado/lib/components/Tag';
import TabbedList from '@approbado/lib/components/TabbedList'
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { ReactComponent as TagIcon } from '@approbado/lib/icons/Tag.svg'
import Link from '@material-ui/core/Link';
import { useConvertPostgresDate } from '@approbado/lib/hooks/useConvertPostgresDate'
import Spinner from '@approbado/lib/components/Spinner'
import Overview from './Overview'
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import Analytics from './Analytics'
import { axios } from '@approbado/lib/providers';
import { useParams } from 'react-router-dom'

const tags = record => ([
    {
        name: 'Informe general',
        pathname: 'general',
        component: <Overview {...record} />
    },
    {
        name: 'Estadística',
        pathname: 'statistics',
        component: <Analytics {...record} />
    }
])

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        backgroundColor: theme.palette.background.dark,
        borderRadius: '6px',
        padding: '1rem',
        flexDirection: 'column'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '1rem 0'
    }
}))

const Date = ({ created_at }) => {
    const date = useConvertPostgresDate(created_at)

    return (
        <Typography variant="subtitle1">
            {date}
        </Typography>
    )
}

const ReportShow = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [record, setRecord] = React.useState({})

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/reports/${id}`)

        setRecord(data)
    }, [])

    React.useEffect(() => {
        fetchRecord();
    }, [])

    if (!record) return <Spinner />;

    return (
        <Box>
            <Box marginBottom='2rem'>
                <Typography variant="h5">Reporte #{record.num}</Typography>
            </Box>
            <Box className={classes.root}>
                <Typography variant="subtitle1">
                    {record.post.message}
                </Typography>
                <Box className={classes.content}>
                    <Tag name={record.post.type} icon={<TagIcon />} />
                    <Date {...record} />
                </Box>
                <Box width='content-box'>
                    <Link
                        to={`/forums/${record.post_id}/show`}
                        color='info'
                        underline='hover'
                        component={LinkBehavior}
                    >
                        Abrir publicación
                    </Link>
                </Box>
            </Box>
            <TabbedList tags={tags(record)} />
        </Box>
    )
}

export default ReportShow
