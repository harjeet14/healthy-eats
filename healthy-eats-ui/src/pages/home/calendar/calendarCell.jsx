export function CalendarCell({ date, currentMonth, onClick }) {

    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const day = date.getDate();

    const r1 = Math.random() < 0.5;
    const r2 = Math.random() < 0.5;
    const r3 = Math.random() < 0.5;
    const r4 = Math.random() < 0.5;

    return <div className={`calendar-row-cell ${isCurrentMonth ? "" : "otherMonth"}`} onClick={() => onClick(date)}>
        <div className="calendar-row-cell-header">
            <span className="calendar-row-cell-header-date">{day}</span>
        </div>

        <div className="calendar-row-cell-body">
            <span>
                {r1 && <span>&#x2615;</span>}
                {r2 && <span>&#x1F369;</span>}
            </span>
            <span>
                {r3 && <span>&#x1F355;</span>}
                {r4 && <span>&#x1F379;</span>}
            </span>
        </div>

    </div>
}