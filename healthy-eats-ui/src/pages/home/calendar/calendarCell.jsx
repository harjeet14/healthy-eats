export function CalendarCell({ date, dayData, currentMonth, onClick }) {

    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const day = date.getDate();

    const hasOrder = !!(dayData?.detail?.length ?? 0);


    const breakfasts = (dayData?.detail || []).filter(it => it.meal === 'B');
    const lunches = (dayData?.detail || []).filter(it => it.meal === 'L');
    const diners = (dayData?.detail || []).filter(it => it.meal === 'D');


    const breackfastCal = Math.trunc((breakfasts.reduce((a, i) => a + i.calories, 0) * 1000)) / 1000;
    const lunchCal = Math.trunc((lunches.reduce((a, i) => a + i.calories, 0) * 1000)) / 1000;
    const dinerCal = Math.trunc((diners.reduce((a, i) => a + i.calories, 0) * 1000)) / 1000;
    const totalCal = Math.trunc((breackfastCal + lunchCal + dinerCal) * 1000) / 1000;


    return <div className={`calendar-row-cell ${isCurrentMonth ? "" : "otherMonth"}`} onClick={() => {
        if (isCurrentMonth) {
            onClick(date);
        }
    }}>
        <div className="calendar-row-cell-header">
            <span className="calendar-row-cell-header-date">{day}</span>
            <span className="calendar-row-cell-calories">Day Calories: {totalCal}</span>
        </div>

        {hasOrder &&
            <div className="calendar-row-cell-body">

                <span>
                    <span>&#x2615;</span>
                    {!!breakfasts.length &&
                        <span className="calendar-row-cell-calories">{breackfastCal}</span>
                    }
                    {!breakfasts.length && <span> - </span>}
                </span>
                <span>
                    <span>&#x1F354;</span>
                    {!!lunches.length &&
                        <span className="calendar-row-cell-calories">{lunchCal}</span>
                    }
                    {!lunches.length && <span> - </span>}
                </span>
                <span>
                    <span>&#x1F355;</span>
                    {!!diners.length &&
                        <span className="calendar-row-cell-calories">{dinerCal}</span>
                    }
                    {!diners.length && <span> - </span>}

                </span>
            </div>
        }
        {!hasOrder && <div className="calendar-row-cell-body">
            {isCurrentMonth && <span> &nbsp;&nbsp; Ready to Plan?</span>}
        </div>}

    </div>
}