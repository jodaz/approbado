import * as React from 'react'
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as SelectionIllustration } from '@approbado/lib/illustrations/Selection.svg';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

const StartTriviaSelector = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <NoContent
                icon={<SelectionIllustration />}
                title='Seleccione una trivia'
            />
        </Box>
    )
}

export default StartTriviaSelector
