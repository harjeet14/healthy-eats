import { useEffect, useState } from 'react';
import { getFirstOfMonth, getFirstOfWeek, dayNames, getMonthWeeks, addMonths, getMonthName, getLastOfMonth, getParsableDate } from '../../../services/calendarService'
import FoodService from '../../../services/foodService';
import { OrderModal } from '../orderModal/orderModal';
import './calendar.scss'
import { CalendarRow } from './calendarRow';

export function Calendar() {

    let [current, setCurrent] = useState(new Date());
    let [orderMap, setOrderMap] = useState(new Date());


    useEffect(() => {
        const fom = getFirstOfMonth(current);
        let lastOfMonth = getLastOfMonth(current);

        FoodService.getOrderedItemsMap(fom, lastOfMonth).then((orderMap) => {

            setOrderMap(orderMap);
        });

    }, [current])

    let [showOrderModal, setShowOrderModal] = useState(false);
    let [selectedDate, setSelectedDate] = useState(null);


    let firstOfMonth = getFirstOfMonth(current);

    let firstOfWeek = getFirstOfWeek(firstOfMonth);

    var weeks = getMonthWeeks(firstOfWeek);

    const monthName = getMonthName(current);

    const days = [0, 1, 2, 3, 4, 5, 6];

    async function setCalendarData(date) {
        setCurrent(new Date(date.valueOf()));
    }

    return <div className="calendar">
        <div className="calendar-navigtion">
            <button
                onClick={async () => await setCalendarData(addMonths(current, -1))}>
                {'<<'} Prev
            </button>

            <span className="calendar-navigtion-monthName">{monthName} - {current.getFullYear()}</span>

            <button
                onClick={async () => await setCalendarData(addMonths(current, 1))}>
                Next {'>>'}
            </button>
        </div>

        <div className="calendar-header-row">
            {days.map((day, index) => <div key={`headerCell-${index}`} className="calendar-header-row-cell">{dayNames[index]}</div>)}
        </div>

        {weeks.map((week, index) => <CalendarRow orderMap={orderMap} currentMonth={current} startOfWeek={week} key={`week-${index}`}
            onDayClick={(date) => {
                setSelectedDate(date);
                setShowOrderModal(true);
            }} />)}

        {showOrderModal &&
            <OrderModal
                dayData={orderMap[getParsableDate(selectedDate)]}
                selectedDate={selectedDate}
                onClose={() => {
                    setSelectedDate(null);
                    setShowOrderModal(false);
                }}

                onSubmit={async (selected) => {

                    setShowOrderModal(false);

                    const payload = {
                        date: selectedDate,
                        breakfast: selected.breakfast,
                        lunch: selected.lunch,
                        dinner: selected.dinner,
                        userId: sessionStorage.sessionUserId
                    };

                    await FoodService.saveDayOrder(payload);

                    setCalendarData(current);
                }}
            />
        }
    </div>
}