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
    console.log('date: ', moment().add(date.week, 'weeks')
        .isoWeekday(date.day)
        .hour(date.hour)
        .minute(0)
        .second(0))

    const calculatedDate = moment().add(date.week, 'weeks')
        .isoWeekday(date.day)
        .hour(date.hour)
        .minute(0)
        .second(0)

    return toApiString(calculatedDate)
}

function toApiString(date) {
    console.log('date: ', moment(date).format('YYYY-MM-DDTHH:mm:ss.000Z'))
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
