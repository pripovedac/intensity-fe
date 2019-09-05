import {useState, useEffect} from 'react'
import {calculateWeek} from '../../services/dates'

export default function useCalendarSetup(week) {
    const [loading, setLoading] = useState(false)
    const [weekOffsetText, setWeekOffsetText] = useState(calculateWeek(week))

    useEffect(() => {
        function displayWeek() {
            return calculateWeek(week)
        }

        setLoading(true)

        const timer = setTimeout(() => {
            setWeekOffsetText(displayWeek())
            setLoading(false)
        }, 200);

        return () => clearTimeout(timer);

    }, [week])

    return {loading, weekOffsetText}
}
