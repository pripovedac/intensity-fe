import React, {useState} from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {calculateWeek} from '../../../services/dates'
import {connect} from 'react-redux'
import {selectWeek} from '../../../store/selectors/global.selector'
import './Calendar.scss'

function Calendar(props) {
    const [weekDays] = useState(moment.weekdaysShort())

    function displayWeek() {
        return calculateWeek(props.week)
    }

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
        const trainingType = hour % 2 ? 'Crossfit' : 'Lightfit'
        return (
            <tr key={hour}>
                <th scope="row">
                    {`${hour}:00`}
                </th>
                {insertTableData(hour, trainingType)}
            </tr>
        )
    }

    function handleClick(e) {
        console.log('clicked: ', props)
    }

    function insertTableData(hour, trainingType) {
        return (weekDays.map(day => {
                if (day !== 'Sun') {
                    return (
                        <td key={`${hour}-${day}`}
                            onClick={handleClick}>
                            <Link to={{
                                    pathname: '/wod',
                                    search: `?hour=${hour}&day=${day}&week=${props.week}`
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

    return (
        <div>
            <table className="table-calendar">
                <caption>Intensity week {displayWeek()}</caption>
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

function mapStateToProps(state) {
    return {
        week: selectWeek(state)
    }
}

export default connect(
    mapStateToProps
)(Calendar)
