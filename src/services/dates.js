import moment from 'moment'

export function calculateWeek(weekNumber) {
    const startDate = moment().add(weekNumber, 'weeks')
    const monday = startDate.isoWeekday('Monday')
    const mondayString = toString(monday)
    const sunday = startDate.isoWeekday('Sunday')
    const sundayString = toString(sunday)
    return `${mondayString} - ${sundayString}`
}

function toString(date) {
    return moment(date).format('D MMM YYYY')
}

export function calculateDate(date) {
    const calculatedDate = moment().add(date.week, 'weeks')
        .isoWeekday(date.day)
        .hour(date.hour)
        .minute(0)
        .second(0)

    return toApiString(calculatedDate)
}

export function toApiString(date) {
    return moment(date).format('YYYY-MM-DD_HH:mm:ss')
}

export function toUserDateFormat(date) {
    const dateObject = moment(date)
    const dateString = dateObject.format('dddd, MMMM Do YYYY')
    return dateString
}
