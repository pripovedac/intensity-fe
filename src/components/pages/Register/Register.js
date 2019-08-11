import React, {useState} from 'react'
import '../../styles/public-styles/PublicStyles.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/Input/LabeledInput/LabeledInput'
import PublicButton from '../../ui/Button/PublicButton/PublicButton'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {registerUser} from '../../../store/actions/auth.action'
import {bindActionCreators} from "redux";

function RegisterPage(props) {

    const [name, setName] = useState('John')
    const [lastname, setLastname] = useState('Doe')
    const [email, setEmail] = useState('johndoe@gmail.com')
    const [password, setPassword] = useState('john123')

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
            name.length &&
            lastname.length &&
            email.length &&
            password.length
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
                        value={name}
                        type="text"
                        handleInput={setName}
                    />

                    <LabeledInput
                        label="Lastname"
                        value={lastname}
                        type="text"
                        handleInput={setLastname}
                    />

                    <LabeledInput
                        label="Email"
                        value={email}
                        type="email"
                        handleInput={setEmail}
                    />

                    <LabeledInput
                        label="Password"
                        value={password}
                        type="password"
                        handleInput={setPassword}
                    />

                    <PublicButton>
                        Submit
                    </PublicButton>

                </form>
                <p>
                    Already have an account? Just
                    <Link to="/login/"> login</Link>.
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
