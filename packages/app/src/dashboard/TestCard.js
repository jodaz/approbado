import * as React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import DefaultLinkBehavior from '@approbado/lib/components/LinkBehavior'
import { styled } from '@material-ui/core/styles'

const LinkBehavior = styled(DefaultLinkBehavior)(() => ({
    'textDecoration': 'none',
    '&:visited': {
        color: 'unset'
    }
}));

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '12px !important',
        border: `1px solid #D1D1D1`,
        backgroundColor: theme.palette.info.default,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '16rem',
        height: '10rem',
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
        }
    },
    bar: {
        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit',
        background: `linear-gradient(333.79deg, #E4DB12 25.41%, #F6D915 48.46%, #FAC91E 71.46%)`,
        width: '1rem',
        height: 'inherit'
    },
    count: {
        paddingLeft: '1rem',
        textAlign: 'center',
        color: theme.palette.info.light,
    }
}));

const AnalyticsCard = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root} to='/profile/edit' component={LinkBehavior}>
            <Box component='div' className={classes.bar} />
            <Box display='flex' flexDirection='column' alignSelf='end' padding='1rem'>
                <Box component='strong'>
                    Derecho constitucional
                </Box>
                <Box sx={{ color: '#232730' }}>
                    Te faltan 12 preguntas
                </Box>
            </Box>
        </Box>
    );
}

export default AnalyticsCard
