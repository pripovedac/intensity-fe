import React from 'react'
import '../public-styles/PublicStyles.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/LabeledInput/LabeledInput'
import Button from '../../ui/Button/Button'
import {Link} from 'react-router-dom'

function RegisterPage(props) {
    return (
        <div className="public-page">
            <Card>
                <h1>Register</h1>
                <div className="funny-text">
                    <p>Welcome to Intensity app! </p>
                    <p> Feeling ready to enter the chamber of strength?</p>
                </div>
                <LabeledInput
                    label="NAME"
                    type="text"
                />
                <LabeledInput
                    label="Lastname"
                    type="text"
                />
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
                    Already have an account? Just
                    <Link to="/login/"> login</Link>.
                </p>
            </Card>
        </div>
    )
}

export default RegisterPage
