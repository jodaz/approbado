import * as React from 'react'
import Box from '@material-ui/core/Box';
import Tag from '@approbado/lib/components/Tag';
import TabbedList from '@approbado/lib/components/TabbedList'
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { ReactComponent as TagIcon } from '@approbado/lib/icons/Tag.svg'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const tags = [
    {
        name: 'Informe general',
        pathname: 'general',
        component: <></>
    },
    {
        name: 'Estadística',
        pathname: 'statistics',
        component: <></>
    }
]

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

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

const ReportShow = () => {
    const classes = useStyles();

    return (
        <Box>
            <Box marginBottom='2rem'>
                <Typography variant="h5">Reporte #000001</Typography>
            </Box>
            <Box className={classes.root}>
                <Typography variant="subtitle1">
                    ¿Por qué los estudiantes de derecho son imbéciles?
                </Typography>
                <Box className={classes.content}>
                    <Tag name='Foros' icon={<TagIcon />} />
                    <Typography variant="subtitle1">
                        15, Julio 2021
                    </Typography>
                </Box>
                <Link to='/forums/1/show' component={LinkBehavior}>
                    Abrir publicación
                </Link>
            </Box>
            <TabbedList tags={tags} />
        </Box>
    )
}

export default ReportShow
