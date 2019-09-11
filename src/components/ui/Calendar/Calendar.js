import React, {useState} from 'react'
import useCalendarSetup from '../../custom-hooks/useCalendarSetup'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {Link} from 'react-router-dom'
import {selectWeek} from '../../../store/selectors/global.selector'
import {globalTypes} from '../../../services/enums'
import moment from 'moment'
import classNames from 'classnames'
import './Calendar.scss'

export default function Calendar(props) {
    const week = useSelectorWrapper(selectWeek)
    const {loading, weekOffsetText} = useCalendarSetup(week)
    const [weekDays] = useState(moment.weekdaysShort())

    function getDays() {
        let days = weekDays.map(day => {
            if (day !== 'Sun') {
                return (
                    <th scope="col"
                        key={day}>
                        {day}
                    </th>
                )
            } else
                return null
        }).filter(day => day)


        days.unshift(
            <th scope="col"
                key="empty">
                {''}
            </th>
        )

        return (
            <tr>{days}</tr>
        )
    }

    function createRows() {
        const startingTime = 16
        const endingTime = 20
        const tableBody = []

        for (let hour = startingTime; hour <= endingTime; hour++) {
            tableBody.push(createSingleRow(hour))
        }

        return (tableBody)
    }

    function createSingleRow(hour) {
        const trainingType = hour % 2 ? globalTypes.crossfit : globalTypes.lightfit
        return (
            <tr key={hour}>
                <th scope="row">
                    {`${hour}:00`}
                </th>
                {insertTableData(hour, trainingType)}
            </tr>
        )
    }

    function insertTableData(hour, trainingType) {
        return (weekDays.map(day => {
                if (day !== 'Sun') {
                    return (
                        <td key={`${hour}-${day}`}>
                            <Link to={{
                                pathname: '/wod',
                                search: `?hour=${hour}&day=${day}&week=${week}`
                            }}>
                                {trainingType}
                            </Link>
                        </td>
                    )
                } else
                    return null
            }).filter(day => day)
        )
    }

    const classes = classNames({
        'table-calendar': true,
        'loading-calendar': loading
    })

    return (
        <div>
            <table className={classes}>
                <caption>{`Intensity week ${weekOffsetText}`}</caption>
                <thead>
                {getDays()}
                </thead>
                <tbody>
                {createRows()}
                </tbody>
            </table>
        </div>

    )
}
