import * as React from 'react'
import Box from '@material-ui/core/Box';
import Tag from '@approbado/lib/components/Tag';
import TabbedList from '@approbado/lib/components/TabbedList'
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { ReactComponent as TagIcon } from '@approbado/lib/icons/Tag.svg'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useShowController } from 'react-admin'
import { useConvertPostgresDate } from '@approbado/lib/hooks/useConvertPostgresDate'
import Spinner from '@approbado/lib/components/Spinner'

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

const General = ({ owner }) => {
    const classes = useStyles();

    return (
        <Box>
            <Box marginBottom='2rem'>
                <Typography variant="h6">Publicado por</Typography>
            </Box>
        </Box>
    )
}

export default General
