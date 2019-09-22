import React from 'react'
import useInput from '../../custom-hooks/useInput'
import {useDispatch} from 'react-redux'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/Input/LabeledInput/LabeledInput'
import PublicButton from '../../ui/Button/PublicButton/PublicButton'
import {Link} from 'react-router-dom'
import {loginUser} from '../../../store/actions/auth.action'
import '../../styles/public-styles/PublicStyles.scss'

export default function LoginPage(props) {
    const dispatch = useDispatch()

    const {
        value: email,
        bind: bindEmail
    } = useInput('trener@gmail.com')

    const {
        value: password,
        bind: bindPassword
    } = useInput('trener')

    async function handleSubmit(event) {
        event.preventDefault()

        if (checkForm()) {
            const user = {email, password}
            dispatch(loginUser(user))
        } else {
            alert('Please, fill in the data.')
        }
    }

    function checkForm() {
        return (
            email.trim().length &&
            password.trim().length
        )
    }

    return (
        <div className="public-page">
            <Card>

                <h1>Intensity Login</h1>
                <div className="funny-text">
                    <p>
                        Feeling strong today?
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <LabeledInput
                        label="Email"
                        type="email"
                        {...bindEmail}/>
                    <LabeledInput
                        label="Password"
                        type="password"
                        {...bindPassword}/>
                    <PublicButton
                        type="submit">
                        Submit
                    </PublicButton>
                </form>

                <p>
                    Don't have an account?
                    Feel free to
                    <Link to="/register/">
                        register
                    </Link>
                </p>

            </Card>
        </div>
    )
}
