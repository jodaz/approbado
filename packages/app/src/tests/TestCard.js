import * as React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import DefaultLinkBehavior from '@approbado/lib/components/LinkBehavior'
import { styled } from '@material-ui/core/styles'
import { useTriviaDispatch } from "@approbado/lib/hooks/useTriviaSelect"

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

const TestCard = trivia => {
    const { id, name, subthemesCount, subthemesFinishedCount } = trivia
    const classes = useStyles()
    const total = subthemesCount - subthemesFinishedCount;
    const { setTrivia } = useTriviaDispatch();

    return (
        <Box
            className={classes.root}
            to='/trivias'
            component={LinkBehavior}
            key={id}
            onClick={() => setTrivia(trivia)}
        >
            <Box component='div' className={classes.bar} />
            <Box display='flex' flexDirection='column' alignSelf='end' padding='1rem'>
                <Box component='strong'>
                    {name}
                </Box>
                <Box sx={{ color: '#232730' }}>
                    {`Te faltan ${total} subtemas`}
                </Box>
            </Box>
        </Box>
    );
}

export default TestCard
