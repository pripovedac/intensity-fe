import React, {useState} from 'react'
import useInput from '../../custom-hooks/useInput'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch} from 'react-redux'
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
import {selectUpdateNotification} from '../../../store/selectors/global.selector'
import {withRouter} from 'react-router-dom'
import '../../styles/form-styles/FormStyles.scss'

function TrainingForm(props) {
    const {search} = props.location
    const [globalType, setGlobaltype] = useState(calculateTrainingType(search))
    const wod = useSelectorWrapper(selectNewWod)
    const isUpdate = useSelectorWrapper(selectUpdateNotification)
    const dispatch = useDispatch()

    const {
        value: date,
        bind: bindDate,
    } = useInput(calculateInitDate())

    const {
        value: name,
        bind: bindName,
    } = useInput(wod.name)

    const {
        value: duration,
        bind: bindDuration,
    } = useInput(wod.duration)

    const {
        value: roundNumber,
        bind: bindRounds
    } = useInput(wod.roundNumber)

    // todo: this should be taken from DB
    const trainingOptions = ['custom', 'emom', 'amrap',
        'rft', 'chipper', 'ladder', 'tabata']
    const [trainingType, setTrainingType] = useState(wod.trainingType
        ? wod.trainingType
        : trainingOptions[0])

    // todo: this should be taken from DB
    const trainerOptions = ['Dusan Arandjelovic', 'Milan Spasic', 'Nemanja Sutanovac']
    const [trainer, setTrainer] = useState(wod.trainer
        ? wod.trainer
        : trainerOptions[0])

    function calculateInitDate() {
        const queryParams = queryString.parse(props.location.search)
        const dateParams = calculateDate(queryParams)
        const dateParts = dateParams.split(' ')
        // todo: check with redux
        return dateParts[0]
    }

    function calculateTrainingType(search) {
        const queryParams = queryString.parse(search)
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
            dispatch(addNewWod(validatedWod))
            dispatch(setExerciseMode())
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

    function displayTrainingType() {
        if (isUpdate) {
            return (
                <h2 className={"no-radio"}>
                    {globalType}
                </h2>
            )
        } else {
            return (
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
            )
        }
    }

    return (
        <div className="training-form">
            <h1>Workout of the Day</h1>
            <form onSubmit={handleSubmit}>
                {displayTrainingType()}

                <LabeledInput
                    type="date"
                    label="Date"
                    disabled={isUpdate}
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
                             value={trainingType}
                             options={trainingOptions}
                             handleInput={setTrainingType}/>

                <SelectInput className="custom-input"
                             label="Trainer"
                             value={trainer}
                             options={trainerOptions}
                             handleInput={setTrainer}/>

                <div className="button-container">
                    <RoundedButton
                        type="button"
                        onClick={() => dispatch(setRegularMode())}>
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

export default withRouter(TrainingForm)
