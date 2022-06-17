import * as React from 'react'
import { axios } from '@approbado/lib/providers'
import SuccessDialog from './SuccessDialog'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import ScheduleForm from './ScheduleForm'

const ScheduleCreate = () => {
    const [openDialog, setOpenDialog] = React.useState(false)
    const { fetchSchedules } = useSchedulesDispatch();
    const { user } = useUserState();

    const handleSubmit = async (values) => {
        const { time, day, starts_at, notify_before, ...rest } = values;

        try {
            await axios.post('/schedules', {
                starts_at: `${starts_at} ${time}`,
                notify_before:  notify_before ? true : false,
                ...rest
            })

            setOpenDialog(true)
            fetchSchedules(user.id)
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }

    return (
        <>
            <ScheduleForm
                handleSubmit={handleSubmit}
            />
            <SuccessDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
        </>
    )
}

export default ScheduleCreate
