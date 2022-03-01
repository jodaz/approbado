import * as React from 'react'
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as SelectionIllustration } from '@approbado/lib/illustrations/Selection.svg';
import BeforeStarting from './BeforeStarting'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

const StartTriviaSelector = ({ level, type, trivia, selectedSubthemes }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {(level && type) ? (
                <BeforeStarting trivia={trivia} subthemes={selectedSubthemes} />
            ) : (
                <NoContent
                    icon={<SelectionIllustration />}
                    title='Seleccione un nivel y un tipo de trivia'
                />
            )}
        </Box>
    )
}

export default StartTriviaSelector
