import React, {useState} from 'react'
import '../public-styles/PublicStyles.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/LabeledInput/LabeledInput'
import Button from '../../ui/Button/Button'
import {Link} from 'react-router-dom'

function LoginPage(props) {

    const [email, setEmail] = useState('johndoe@gmail.com')
    const [password, setPassword] = useState('john123')

    function handleSubmit(event) {
        event.preventDefault()

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

                    <Button
                        type="submit"
                    >
                        Submit
                    </Button>

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

export default LoginPage
