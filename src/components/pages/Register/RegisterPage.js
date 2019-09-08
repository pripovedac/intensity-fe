import React from 'react'
import {useDispatch} from 'react-redux'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/Input/LabeledInput/LabeledInput'
import PublicButton from '../../ui/Button/PublicButton/PublicButton'
import useInput from '../../custom-hooks/useInput'
import {Link} from 'react-router-dom'
import {registerUser} from '../../../store/actions/auth.action'
import '../../styles/public-styles/PublicStyles.scss'
import './RegisterPage.scss'

export default function RegisterPage(props) {
    console.log('Rendering register page.')

    const dispatch = useDispatch()

    const {
        value: name,
        bind: bindName,
    } = useInput('John');

    const {
        value: lastname,
        bind: bindLastname,
    } = useInput('Doe');

    const {
        value: email,
        bind: bindEmail
    } = useInput('johndoe@gmail.com');

    const {
        value: password,
        bind: bindPassword
    } = useInput('john123');

    const {
        value: isTrainer,
        bind: bindTrainerFlag
    } = useInput(false)

    async function handleSubmit(event) {
        event.preventDefault()

        if (checkForm()) {
            const role = isTrainer
                ? 'trainer'
                : 'user'
            const newUser = {
                name,
                lastname,
                email,
                password,
                role
            }
            dispatch(registerUser(newUser))
        } else {
            alert('Please, fill in the data.')
        }
    }

    function checkForm() {
        return (
            name.trim().length &&
            lastname.trim().length &&
            email.trim().length &&
            password.trim().length
        )
    }

    return (
        <div className="public-page">
            <Card>

                <h1>Intensity Register</h1>

                <div className="funny-text">
                    <p> Feeling ready to enter the chamber of strength?</p>
                </div>

                <form onSubmit={handleSubmit}>
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
                    <LabeledInput
                        label="Password"
                        type="password"
                        {...bindPassword}/>
                    <label className="label-checkbox">
                        Will you be trainer?
                        <input type="checkbox"
                               {...bindTrainerFlag}/>
                    </label>
                    <PublicButton>
                        Submit
                    </PublicButton>
                </form>

                <p>
                    Already have an account? Just
                    <Link to="/login/">
                        login
                    </Link>
                </p>

            </Card>
        </div>
    )
}
