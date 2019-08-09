import React from 'react'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import {IoIosRefresh} from 'react-icons/io'
import './WeeklyNavigation.scss'
import {bindActionCreators} from "redux";
import {substractWeek, addWeek, resetWeek} from '../../../store/actions/global.action'
import {connect} from 'react-redux'

function WeeklyNavigation(props) {
    return (
        <div className="weekly-navigation">

            <button
                onClick={props.substractWeek}>
                <FaArrowAltCircleLeft/>
            </button>
            <button
                onClick={props.resetWeek}>
                <IoIosRefresh/>
            </button>
            <button
                onClick={props.addWeek}>
                <FaArrowAltCircleRight/>
            </button>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            substractWeek,
            resetWeek,
            addWeek
        }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(WeeklyNavigation)

