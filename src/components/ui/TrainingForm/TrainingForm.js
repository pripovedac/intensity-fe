import React, {useState} from 'react'
import useInput from '../../custom-hooks/useInput'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import RadioButton from '../Input/RadioButton/RadioButton'
import SelectInput from '../Input/SelectInput/SelectInput'
import {FaArrowAltCircleLeft, FaCheckCircle} from 'react-icons/fa'
import RoundedButton from '../Button/RoundedButton/RoundedButton.js'
import queryString from 'query-string'
import {calculateDate} from '../../../services/dates'
import {addNewWod} from '../../../store/actions/wod.action'
import {setExerciseMode, setRegularMode} from '../../../store/actions/global.action'
import {selectNewWod} from '../../../store/selectors/wod.selector'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../styles/form-styles/FormStyles.scss'

function TrainingForm(props) {
    const [globalType, setGlobaltype] = useState(calculateTrainingType())

    const {
        value: date,
        bind: bindDate,
    } = useInput(calculateInitDate())

    const {
        value: name,
        bind: bindName,
    } = useInput(props.wod.name)

    const {
        value: duration,
        bind: bindDuration,
    } = useInput(props.wod.duration)

    const {
        value: roundNumber,
        bind: bindRounds
    } = useInput(props.wod.roundNumber)

    // todo: this should be taken from DB
    const trainingOptions = ['custom', 'emom', 'amrap',
        'rft', 'chipper', 'ladder', 'tabata']
    const [trainingType, setTrainingType] = useState(props.wod.trainingType ?
        props.wod.trainingType :
        trainingOptions[0])

    // todo: this should be taken from DB
    const trainerOptions = ['Dusan Arandjelovic', 'Milan Spasic', 'Nemanja Sutanovac']
    const [trainer, setTrainer] = useState(props.wod.trainer ?
        props.wod.trainer :
        trainerOptions[0])

    function calculateInitDate() {
        const queryParams = queryString.parse(props.location.search)
        const dateParams = calculateDate(queryParams)
        const dateParts = dateParams.split(' ')
        // todo: check with redux
        return dateParts[0]
    }

    function calculateTrainingType() {
        const queryParams = queryString.parse(props.location.search)
        // This is only temporary.
        return queryParams.hour % 2
            ? 'crossfit'
            : 'lightfit'
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (checkForm()) {
            const wod = createWod()
            const validatedWod = validateWod(wod)
            props.addNewWod(validatedWod)
            props.setExerciseMode()
        } else {
            alert('WOD is not intense if it does not have a name.')
        }
    }

    function checkForm() {
        return name.trim().length
    }

    function createWod() {
        return {
            globalType,
            name,
            date,
            duration,
            roundNumber,
            trainer,
            trainingType,
        }
    }

    function validateWod(wod) {
        let validatedWod
        validatedWod = validateProperty(wod, 'duration')
        validatedWod = validateProperty(wod, 'roundNumber')
        return validatedWod
    }

    // Validation is necessary due to BE type constraints.
    function validateProperty(wod, property) {
        if (!wod[property]) {
            wod[property] = 0
        }
        return wod
    }


    return (
        <div className="training-form">
            <h1>Workout of the Day</h1>
            <form onSubmit={handleSubmit}>
                <div className="radio-container">
                    <p>WOD</p>
                    <RadioButton
                        name="training-type"
                        value="type"
                        label="Crossfit"
                        checked={globalType === 'crossfit'}
                        handleInput={() => setGlobaltype('crossfit')}
                    />
                    <RadioButton
                        name="training-type"
                        value="type"
                        label="Lightfit"
                        checked={globalType === 'lightfit'}
                        handleInput={() => setGlobaltype('lightfit')}
                    />
                </div>

                <LabeledInput
                    type="date"
                    label="Date"
                    {...bindDate}/>

                <LabeledInput
                    label="Name"
                    type="text"
                    placeholder="Dangerous name"
                    {...bindName}/>

                <LabeledInput
                    type="number"
                    label="Duration"
                    placeholder="0"
                    {...bindDuration}/>

                <LabeledInput
                    type="number"
                    label="Rounds"
                    placeholder="0"
                    {...bindRounds}/>

                <SelectInput className="custom-input"
                             label="Training type"
                             options={trainingOptions}
                             handleInput={setTrainingType}/>

                <SelectInput className="custom-input"
                             label="Trainer"
                             options={trainerOptions}
                             handleInput={setTrainer}/>

                <div className="button-container">
                    <RoundedButton
                        onClick={props.setRegularMode}>
                        <FaArrowAltCircleLeft
                            className="button-icon"/>
                    </RoundedButton>

                    <RoundedButton
                        type="submit">
                        <FaCheckCircle
                            className="button-icon"/>
                    </RoundedButton>
                </div>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        wod: selectNewWod(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addNewWod,
            setExerciseMode,
            setRegularMode,
        }, dispatch)
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TrainingForm))
