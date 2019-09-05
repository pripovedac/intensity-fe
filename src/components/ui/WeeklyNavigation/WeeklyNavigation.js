import React from 'react'
import {useDispatch} from 'react-redux'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import {IoIosRefresh} from 'react-icons/io'
import {subtractWeek, addWeek, resetWeek} from '../../../store/actions/global.action'
import './WeeklyNavigation.scss'

export default function WeeklyNavigation() {
    const dispatch = useDispatch()

    return (
        <div className="weekly-navigation">
            <button
                onClick={() => dispatch(subtractWeek())}>
                <FaArrowAltCircleLeft/>
            </button>
            <button
                onClick={() => dispatch(resetWeek())}>
                <IoIosRefresh/>
            </button>
            <button
                onClick={() => dispatch(addWeek())}>
                <FaArrowAltCircleRight/>
            </button>
        </div>
    )
}
