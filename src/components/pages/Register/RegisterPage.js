import React, {useState} from 'react'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/Input/LabeledInput/LabeledInput'
import PublicButton from '../../ui/Button/PublicButton/PublicButton'
import useInput from '../../custom-hooks/useInput'
import {Link} from 'react-router-dom'
import {registerUser} from '../../../store/actions/auth.action'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import '../../styles/public-styles/PublicStyles.scss'

function RegisterPage(props) {
    console.log('Rendering register page.')
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

    async function handleSubmit(event) {
        event.preventDefault()

        if (checkForm()) {
            const newUser = {
                name,
                lastname,
                email,
                password
            }
            props.registerUser(newUser)
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
                    <p>Welcome to Intensity app! </p>
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
                    <PublicButton>
                        Submit
                    </PublicButton>
                </form>

                <p>
                    Already have an account? Just
                    <Link to="/login/">
                        login
                    </Link>.
                </p>

            </Card>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({registerUser}, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(RegisterPage)
