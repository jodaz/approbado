import * as React from 'react'
import Box from '@material-ui/core/Box'
import CustomButton from '@approbado/lib/components/Button'
import { usePlan } from '@approbado/lib/hooks/useUserState';
import CloseIcon from '@approbado/lib/icons/CloseIcon'
import CheckIcon from '@approbado/lib/icons/CheckIcon'
import UpdatePlanBanner from './UpdatePlanBanner'
import { format, parseISO, differenceInDays } from 'date-fns'

const NoAccessItem = () => (
    <li style={{
        width: '50%'
    }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            color: '#6D6D6D',
            justifyContent: 'space-between'
        }}>
            Lorem ipsum
            <CloseIcon />
        </div>
    </li>
)

const AccessItem = () => (
    <li style={{
        width: '50%'
    }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
        }}>
            Lorem ipsum
            <CheckIcon />
        </div>
    </li>
)

const FreeMembershipMessage = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
        }}>
            <Box width='50%'>
                Actualmente tienes una cuenta free, cambiate a premium
                y obtén más beneficios 😄
            </Box>
            <Box>
                <CustomButton unresponsive>
                    Ser premium
                </CustomButton>
            </Box>
        </Box>
        <Box component='div'>
            <ul>
                <AccessItem />
                <AccessItem />
                <AccessItem />
                <NoAccessItem />
                <NoAccessItem />
                <NoAccessItem />
                <NoAccessItem />
            </ul>
        </Box>
    </Box>
)

const PremiumMembershipMessage = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
        }}>
            <Box width='50%'>
                Con Approbado Premium tienes acceso a:
            </Box>
            <Box>
                <CustomButton unresponsive>
                    Actualizar
                </CustomButton>
            </Box>
        </Box>
        <Box component='div'>
            <ul>
                <AccessItem />
                <AccessItem />
                <AccessItem />
                <AccessItem />
                <AccessItem />
                <AccessItem />
            </ul>
        </Box>
    </Box>
)

const AboutMe = () => {
    const { plan, membership } = usePlan();
    const currDate = new Date();
    const membershipStartDate = parseISO(membership.created_at)
    const daysLeft = differenceInDays(currDate, membershipStartDate)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {(daysLeft && daysLeft < 7) && <UpdatePlanBanner days={daysLeft} />}
            <Box sx={{
                textTransform: 'uppercase',
                fontWeight: 600
            }}>
                Tu plan
            </Box>
            <Box component='h1'>
                {plan.name}
            </Box>
            {plan.name.search('free')
                ? <FreeMembershipMessage />
                : <PremiumMembershipMessage />
            }
        </Box>
    );
}

export default AboutMe;
