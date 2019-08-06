import moment from 'moment'

export function calculateWeek() {
    const monday = moment().startOf('isoweek')
    const sunday = moment().endOf('week')

    return `${toString(monday)} - ${toString(sunday)}`
}

function toString(date) {
    return moment(date).format('D MMM YYYY')
}
