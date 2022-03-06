import * as React from 'react';
import {
    FilterContext,
    ListBase,
    FilterLiveSearch,
    TopToolbar,
} from 'react-admin';
import { useMediaQuery, makeStyles  } from '@material-ui/core'
import { ReactComponent as BannerIllustration } from '@approbado/lib/illustrations/Banner.svg';
import { ReactComponent as LeftAngleIcon } from '@approbado/lib/icons/LeftAngle.svg'
import GridList from '@approbado/lib/components/GridList';
import TriviaCard from './TriviaCard'
import Drawer from '@material-ui/core/Drawer'
import Temary from './temary'
import SelectTrivia from './SelectTrivia'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Hooks
import { useTriviaState, useTriviaDispatch } from "@approbado/lib/hooks/useTriviaSelect"
import { usePlan } from '@approbado/lib/hooks/useUserState';
import useDetectOutsideClick from '@approbado/lib/hooks/useDetectOutsideClick';

const drawerWidth = 300;

const useStyles = makeStyles(() => ({
    drawerPaper: {
        width: drawerWidth,
        paddingTop: '2rem'
    },
    unsetTriviaButton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '4.5rem',
        marginBottom: '1rem',
        fontSize: '0.95rem'
    }
}));

const ListActions = () => (
    <TopToolbar>
        <FilterLiveSearch label='' source="name" label='Buscar trivia' />
    </TopToolbar>
);

const TriviaList = props => (
    <ListBase
        basePath='trivias'
        resource='trivias'
        perPage={10}
        sort={{ field: 'created_at', order: 'DESC' }}
        {...props}
    >
        <TriviaListView />
    </ListBase>
);

const TriviaListView = () => {
    const classes = useStyles();
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const wrapperRef = React.useRef(null);
    const outsideClick = useDetectOutsideClick(wrapperRef);
    const { selected, trivia } = useTriviaState();
    const { found: isFreeMembership} = usePlan('Free');
    const { unsetTrivia } = useTriviaDispatch();

    const renderSelectedTriviaContent = () => (
        <Box padding='0 1rem' width={isSmall ? 'unset' : '20%'} display={!selected && 'none'}>
            {(!trivia.is_free && isFreeMembership) ? (
                <BannerIllustration />
            ) : (
                <Temary {...trivia} />
            )}
        </Box>
    )

    React.useEffect(() => {
        if (outsideClick) { unsetTrivia() }
    }, [outsideClick])

    return (
        <>
            <Box display="flex" height='100%' width='100%'>
                <Box width={isSmall ? '100%' : '80%'}>
                    <Typography variant='h5'>
                        Trivias
                    </Typography>
                    <FilterContext.Provider>
                        <ListActions />
                    </FilterContext.Provider>
                    <GridList component={<TriviaCard />} />
                </Box>
                {(isSmall) ? (
                    <Drawer
                        variant="persistent"
                        anchor='right'
                        open={selected}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        onClose={() => unsetTrivia()}
                        ModalProps={{ keepMounted: true }}
                        ref={wrapperRef}
                    >
                        <Box className={classes.unsetTriviaButton} onClick={() => unsetTrivia()}>
                            <LeftAngleIcon />
                            Volver
                        </Box>
                        {renderSelectedTriviaContent()}
                    </Drawer>
                ) : (!selected)
                ? <SelectTrivia />
                : renderSelectedTriviaContent()}
            </Box>
        </>
    );
}

export default TriviaList;
