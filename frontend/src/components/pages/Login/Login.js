import React from 'react'
import './Login.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/LabeledInput/LabeledInput'
import Button from '../../ui/Button/Button'

function LoginPage(props) {
    return (
        <div className="login-page">
            <Card>
                <h1>Login</h1>
                <div className="funny-text">
                    <p>Welcome to Intensity app! </p>
                    <p> Feeling ready to enter the chamber of strength?</p>
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
            </Card>
        </div>
    )
}

export default LoginPage
