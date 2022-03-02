import * as React from 'react';
import Box from '@material-ui/core/Box';
import { ReactComponent as BannerIllustration } from '@approbado/lib/illustrations/Banner.svg';
import { usePlan } from '@approbado/lib/hooks/useUserState';

const AsideBar = () => {
    const { found: isFreeMembership} = usePlan('Free');

    return isFreeMembership && (
        <Box p='0 0 0 2rem'>
            <BannerIllustration />
        </Box>
    );
}

export default AsideBar
