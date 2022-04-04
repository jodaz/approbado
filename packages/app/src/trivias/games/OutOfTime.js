import * as React from 'react'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import Box from '@material-ui/core/Box'
import Emoji from '@approbado/lib/components/Emoji'
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import ShareIcon from '@approbado/lib/icons/ShareIcon'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    resources: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        textDecoration: 'underline',
        height: 'fit-content',
        width: 'fit-content',
        fontSize: '1rem',
        marginTop: '0.5rem',
        color: theme.palette.info.light,
        '&:visited': {
            color: 'normal'
        }
    },
    icon: {
        fontSize: 'inherit',
        marginLeft: '0.5rem'
    }
}))

export default function() {
    const {
        selected,
    } = useTriviaState();
    const classes = useStyles();

    if (!selected) return null

    return (
        <Box sx={{
            fontSize: '2rem',
            background: '#F5F5F5',
            borderRadius: '6px',
            padding: '2rem'
        }}>
            ¡Se ha acabado el tiempo!
            <Emoji symbol='😯' />
            <Box
                className={classes.resources}
                fontSize='0.9rem'
                component={LinkBehavior}
                to='/trivias'
            >
                Para jugar de nuevo, continúe aquí <ShareIcon className={classes.icon} />
            </Box>
        </Box>
    )
}
