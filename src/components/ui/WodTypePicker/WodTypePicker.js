import React from 'react'
import {useDispatch} from 'react-redux'
import LeftArrow from './left-arrow.jpg'
import RightArrow from './right-arrow.jpg'
import {setRegularMode} from '../../../store/actions/global.action'
import moment from 'moment'
import './WodTypePicker.scss'

export default function WodTypePicker(props) {
    const dispatch = useDispatch()

    function openLightfitWod() {
        props.history.push({
            pathname: '/wod',
            search: `?hour=16&day=${getDay()}&week=0`
        })
        dispatch(setRegularMode())
    }

    function openCrossfitWod() {
        props.history.push({
            pathname: '/wod',
            search: `?hour=17&day=${getDay()}&week=0`
        })
        dispatch(setRegularMode())
    }

    function getDay() {
        return moment(new Date()).format('ddd')
    }

    return (
        <div className="wod-type-picker">
            <label>
                <button onClick={openLightfitWod}>
                    <img src={LeftArrow} alt="Left arrow"/>
                </button>
                Lightfit
            </label>
            <label>
                <button onClick={openCrossfitWod}>
                    <img src={RightArrow} alt="Right arrow"/>
                </button>
                Crossfit
            </label>
        </div>
    )
}
