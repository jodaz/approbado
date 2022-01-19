import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core'
import { ReactComponent as SelectionIllustration } from '@approbado/lib/illustrations/Selection.svg';
import { useTriviaState } from "@approbado/lib/hooks/useTriviaSelect"
import { ReactComponent as BannerIllustration } from '@approbado/lib/illustrations/Banner.svg';
import NoContent from '@approbado/lib/components/NoContent'
import Temary from '../components/temary'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))

const SelectTrivia = ({ isXSmall }) => {
    const classes = useStyles();
    const { trivia, selected } = useTriviaState();

    return (
        <Box>
            {!isXSmall && (
                <Box p='0 0 0 2rem'>
                    <Box className={classes.root}>
                        {(!selected) && (
                            <NoContent
                                icon={<SelectionIllustration />}
                                title='Seleccione una trivia'
                            />
                        )}
                        <BannerIllustration />
                        <Temary />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

SelectTrivia.propTypes = {
    isXSmall: PropTypes.bool
}

export default SelectTrivia
