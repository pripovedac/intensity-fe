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
