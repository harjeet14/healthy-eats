import { getParsableDate, getWeekDays } from "../../../services/calendarService";
import { CalendarCell } from "./calendarCell";

export function CalendarRow({ startOfWeek, currentMonth, orderMap, onDayClick }) {

    let days = getWeekDays(startOfWeek);
    return <div className="calendar-row">

        {days.map((date, index) => {
            const dayData = orderMap[getParsableDate(new Date(date))];
            return <CalendarCell dayData={dayData} onClick={onDayClick} currentMonth={currentMonth} date={date} key={`cell-${index}`
            } />;
        })}
    </div>
}