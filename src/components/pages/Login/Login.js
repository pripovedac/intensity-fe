import React, {useState} from 'react'
import '../../styles/public-styles/PublicStyles.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/Input/LabeledInput/LabeledInput'
import PublicButton from '../../ui/Button/PublicButton/PublicButton'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser} from '../../../store/actions/auth.action'
import {bindActionCreators} from 'redux'

function LoginPage(props) {

    const [email, setEmail] = useState('wile.e.coyote@acme.com')
    const [password, setPassword] = useState('wilespassword')

    async function handleSubmit(event) {
        event.preventDefault()

        if (checkForm()) {
            const user = {email, password}
            props.loginUser(user)
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
                    <p>Feeling strong today?</p>
                </div>

                <form onSubmit={handleSubmit}>

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

                    <PublicButton
                        type="submit"
                    >
                        Submit
                    </PublicButton>

                </form>

                <p>
                    Don't have an account?
                    Feel free to
                    <Link to="/register/"> register</Link>.
                </p>

            </Card>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loginUser}, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(LoginPage)
