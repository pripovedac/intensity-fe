import React, {useState} from 'react'
import '../../styles/public-styles/PublicStyles.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/LabeledInput/LabeledInput'
import PublicButton from '../../ui/Button/PublicButton'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser} from '../../../store/actions'

function LoginPage(props) {

    const [email, setEmail] = useState('wile.e.coyote@acme.com')
    const [password, setPassword] = useState('wilespassword')

    async function handleSubmit(event) {
        event.preventDefault()

        const user = {email, password}
        props.loginUser(user)
        console.log('email: ', email)
        console.log('pass: ', password)


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

export default connect(
    null,
    {loginUser}
)(LoginPage)
