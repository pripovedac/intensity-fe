import React, {useState} from 'react'
import '../public-styles/PublicStyles.scss'
import Card from '../../ui/Card/Card'
import LabeledInput from '../../ui/LabeledInput/LabeledInput'
import Button from '../../ui/Button/Button'
import {Link} from 'react-router-dom'

function RegisterPage(props) {

    const [name, setName] = useState('John')
    const [lastname, setLastname] = useState('Doe')
    const [email, setEmail] = useState('johndoe@gmail.com')
    const [password, setPassword] = useState('john123')

    function handleSubmit(event) {
        event.preventDefault()

        console.log('name: ', name)
        console.log('lastname: ', lastname)
        console.log('email: ', email)
        console.log('pass: ', password)
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

                    <Button>
                        Submit
                    </Button>

                </form>
                <p>
                    Already have an account? Just
                    <Link to="/login/"> login</Link>.
                </p>

            </Card>
        </div>
    )
}

export default RegisterPage
