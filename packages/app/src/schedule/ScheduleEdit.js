import * as React from 'react'
import { axios } from '@approbado/lib/providers'
import SuccessDialog from './SuccessDialog'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import { useParams } from 'react-router-dom'
import ScheduleForm from './ScheduleForm'

const ScheduleEdit = () => {
    const { id } = useParams();
    const [openDialog, setOpenDialog] = React.useState(false)
    const { fetchSchedules } = useSchedulesDispatch();
    const [record, setRecord] = React.useState({})
    const { user } = useUserState();

    const handleSubmit = React.useCallback(async (values) => {
        const { time, day, starts_at, notify_before, ...rest } = values;

        try {
            const { data } = await axios.put(`/schedules/${id}`, {
                starts_at: `${starts_at} ${time}`,
                notify_before:  notify_before ? true : false,
                ...rest
            })

            setRecord(data)
            setOpenDialog(true)
            fetchSchedules(user.id)
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [id])

    console.log(record)

    const fetchRecord = React.useCallback(async (scheduleID) => {
        const { data } = await axios.get(`/schedules/${scheduleID}`);

        setRecord({
            ...data,
            trivia_id: data.subtheme.trivia_id
        });
    }, []);

    React.useEffect(async () => {
        if (id) {
            await fetchRecord(id);
        }
    }, [id])

    if (id && !Object.entries(record).length) return null;

    return (
        <>
            <ScheduleForm record={record} handleSubmit={handleSubmit} />
            <SuccessDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title='¡Acaba de editar una trivia!'
            />
        </>
    )
}

export default ScheduleEdit
