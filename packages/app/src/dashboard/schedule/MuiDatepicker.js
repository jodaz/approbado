import * as React from "react";
import { DatePicker } from "@material-ui/pickers";
import Badge from "@material-ui/core/Badge";
import { format, isValid, parse } from "date-fns";
import { Field } from 'react-final-form'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import { ReactComponent as LeftAngleIcon } from '@approbado/lib/icons/LeftAngle.svg'
import { ReactComponent as RightAngleIcon } from '@approbado/lib/icons/RightAngle.svg'

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "dd-MM-yyyy", { locale: this.locale });
    }
}

const CalendarInput = ({ name, input, input: { value, onChange }, items, ...rest }) => {

    return (
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={esLocale}>
            <DatePicker
                disableToolbar
                value={value}
                format="dd-MM-yyyy"
                animateYearScrolling
                variant="static"
                renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                    const isSelected = items.filter(i => i.startsAt == format(day, 'MM-dd-yyyy'))

                    return <Badge badgeContent={isSelected.length} variant="dot" color="secondary">{dayComponent}</Badge>;
                }}
                name={name}
                onChange={date => {
                    if (isValid(date)) {
                        onChange(format(new Date(date), "MM-dd-yyyy"));
                    } else {
                        onChange(null);
                    }
                }}
                initialFocusedDate={new Date()}
                leftArrowIcon={<LeftAngleIcon />}
                rightArrowIcon={<RightAngleIcon />}
            />
        </MuiPickersUtilsProvider>
    );
}

const convertDateFromUTC = date => format(new Date(date), 'MM-dd-yyyy')

const ControlledCalendarInput = ({ data, ...rest }) => {
    const [dates, setDates] = React.useState([])

    React.useEffect(() => {
        if (data.length) {
            const dates = data.map(item => ({
                startsAt: convertDateFromUTC(item.starts_at),
                color: item.level.color
            }))

            setDates(dates)
        }
    }, [])

    return (
        <Field
            component={CalendarInput}
            value={new Date()}
            {...rest}
            items={dates}
        />
    );
}

CalendarInput.defaultProps = {
    color: '#b4b4b4'
}

export default ControlledCalendarInput;
