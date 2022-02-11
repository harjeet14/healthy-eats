export function CalendarCell({ date, dayData, currentMonth, onClick }) {

    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const day = date.getDate();

    const hasOrder = !!(dayData?.detail?.length ?? 0);


    const breakfasts = (dayData?.detail || []).filter(it => it.meal === 'B');
    const lunches = (dayData?.detail || []).filter(it => it.meal === 'L');
    const diners = (dayData?.detail || []).filter(it => it.meal === 'D');


    return <div className={`calendar-row-cell ${isCurrentMonth ? "" : "otherMonth"}`} onClick={() => {
        if (isCurrentMonth) {
            onClick(date);
        }
    }}>
        <div className="calendar-row-cell-header">
            <span className="calendar-row-cell-header-date">{day}</span>
        </div>

        {hasOrder &&
            <div className="calendar-row-cell-body">

                <span>
                    {!!breakfasts.length && <span>&#x2615;</span>}
                </span>
                <span>
                    {!!lunches.length && <span>&#x1F355;</span>}
                </span>
                <span>
                    {!!diners.length && <span>&#x1F379;</span>}

                </span>
            </div>
        }
        {!hasOrder && <div className="calendar-row-cell-body">
            <span>Order?</span>
        </div>}

    </div>
}