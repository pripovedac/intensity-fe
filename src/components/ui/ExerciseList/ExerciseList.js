import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import Exercise from '../Exercise/Exercise'
import {selectName, selectUserRole} from '../../../store/selectors/auth.selector'
import {selectMode} from '../../../store/selectors/global.selector'
import './ExerciseList.scss'
import { userRoles } from '../../../services/enums'

export default function ExerciseList(props) {
    const name = useSelectorWrapper(selectName)
    const mode = useSelectorWrapper(selectMode)
    const role = useSelectorWrapper(selectUserRole)

    function displayExercises() {
        if (props.exercises.length) {
            return props.exercises.map(e => {
                return <Exercise
                    exercise={e}
                    key={e.name}
                    mode={mode}
                />
            })
        } else  if (role != userRoles.member){
            return <p>{`${name}, you haven't added any exercises yet.
            Fill in the intense form for today's wod.`}</p>
        }
    }

    return (
        <div className="exercise-list">
            <h1>Exercise list</h1>
            <ul>
                {displayExercises()}
            </ul>
        </div>
    )
}
