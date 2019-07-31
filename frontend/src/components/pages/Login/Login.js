import React from 'react'
import '../public-styles/PublicStyles.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/LabeledInput/LabeledInput'
import Button from '../../ui/Button/Button'
import {Link} from 'react-router-dom'

function LoginPage(props) {
    return (
        <div className="public-page">
            <Card>
                <h1>Login</h1>
                <div className="funny-text">
                    <p>Feeling strong today?</p>
                </div>
                <LabeledInput
                    label="Email"
                    type="email"
                />
                <LabeledInput
                    label="Password"
                    type="password"
                />
                <Button>
                    Submit
                </Button>
                <p>
                    Don't have an account?
                    Feel free to
                    <Link to="/register/"> register</Link>.
                </p>
            </Card>
        </div>
)
}

export default LoginPage
