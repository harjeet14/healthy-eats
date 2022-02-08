import { getWeekDays } from "../../../services/calendarService";
import { CalendarCell } from "./calendarCell";

export function CalendarRow({ startOfWeek }) {

    let days = getWeekDays(startOfWeek);
    return <div className="calendar-row">

        {days.map((date, index) => <CalendarCell date={date} key={`cell-${index}`} />)}
    </div>
}