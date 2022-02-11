export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getDayName(date) {
  return dayNames[date.getDay()];
}

export function getMonthName(date) {
  return monthNames[date.getMonth()];
}

export function addMonths(date, monthsCount) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + monthsCount,
    date.getDate()
  );
}

export function getParsableDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function addDays(date, daysCount) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + daysCount
  );
}

export function getFirstOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function getFirstOfWeek(date) {
  let d = new Date(date.valueOf());
  while (d.getDay() !== 0) {
    d.setDate(d.getDate() - 1);
  }
  return d;
}

export function getMonthWeeks(date) {
  let res = [];
  for (let i = 0; i < 5; i++) {
    res.push(addDays(date, i * 7));
  }
  return res;
}

export function getWeekDays(date) {
  let res = [];
  for (let i = 0; i < 7; i++) {
    res.push(addDays(date, i));
  }
  return res;
}
