import React from 'react'
import useInput from '../../custom-hooks/useInput'
import {useDispatch} from 'react-redux'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import OnlyIconButton from '../Button/OnlyIconButton/OnlyIconButton'
import {FiCheck} from 'react-icons/fi'
import {selectUser} from '../../../store/selectors/auth.selector'
import {persistUser} from '../../../store/actions/auth.action'
import {updateUser} from '../../../services/api/user'
import removeLoadingState from '../../../services/timeout'
import './UserForm.scss'

export default function UserForm(props) {
    const user = useSelectorWrapper(selectUser)
    const dispatch = useDispatch()

    const {
        value: name,
        bind: bindName,
    } = useInput(user.name)

    const {
        value: lastname,
        bind: bindLastname,
    } = useInput(user.lastName)

    const {
        value: email,
        bind: bindEmail,
    } = useInput(user.email)

    const {
        value: about,
        bind: bindAbout,
    } = useInput(user.about ? user.about : '')

    async function handleSubmit(event) {
        event.preventDefault()

        props.setLoading(true)

        const id = user.id
        const payload = {
            id,
            name,
            lastName: lastname,
            email,
            about
        }
        const updatedUser = await updateUser(payload)

        if (!updatedUser.errorStatus) {
            dispatch(persistUser(updatedUser))
        }

        removeLoadingState(props.setLoading, 200)
    }

    return (
        <form onSubmit={handleSubmit}
              className="user-form"
            autoComplete="off"
        >
            <LabeledInput
                label="Name"
                type="text"
                {...bindName}/>
            <LabeledInput
                label="Lastname"
                type="text"
                {...bindLastname}/>
            <LabeledInput
                label="Email"
                type="email"
                {...bindEmail}/>
            <label className="about">
                About
                <textarea rows="8"
                          spellCheck="false"
                          placeholder="Cool information about you"
                          {...bindAbout}
                />
            </label>
            <OnlyIconButton type="submit">
                <FiCheck/>
            </OnlyIconButton>
        </form>
    )
}
