import { getWeekDays } from "../../../services/calendarService";
import { CalendarCell } from "./calendarCell";

export function CalendarRow({ startOfWeek, currentMonth, onDayClick }) {

    let days = getWeekDays(startOfWeek);
    return <div className="calendar-row">

        {days.map((date, index) => <CalendarCell onClick={onDayClick} currentMonth={currentMonth} date={date} key={`cell-${index}`} />)}
    </div>
}