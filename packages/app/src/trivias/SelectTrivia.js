import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core'
import { ReactComponent as SelectionIllustration } from '@approbado/lib/illustrations/Selection.svg';
import { useTriviaState } from "@approbado/lib/hooks/useTriviaSelect"
import { ReactComponent as BannerIllustration } from '@approbado/lib/illustrations/Banner.svg';
import NoContent from '@approbado/lib/components/NoContent'
import Temary from '../components/temary'
import { usePlan } from '@approbado/lib/hooks/useUserState';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))

const SelectTriviaContent = trivia => {
    const { found: isFreeMembership} = usePlan('Free');

    return (
        <Box width='100%'>
            {(!trivia.is_free && isFreeMembership) ? (
                <BannerIllustration />
            ) : (
                <Temary {...trivia} />
            )}
        </Box>
    )
}

const SelectTrivia = ({ isXSmall }) => {
    const classes = useStyles();
    const { trivia, selected } = useTriviaState();

    return (
        <Box className={classes.root}>
            {!isXSmall && (
                <>
                    {(!selected) ? (
                        <Box className={classes.root} justifyContent="center">
                            <NoContent
                                icon={<SelectionIllustration />}
                                title='Seleccione una trivia'
                            />
                        </Box>
                    ) : <SelectTriviaContent {...trivia} />}
                </>
            )}
        </Box>
    );
}

SelectTrivia.propTypes = {
    isXSmall: PropTypes.bool
}

export default SelectTrivia
