import { useState } from 'react'
import userService from '../services/user'
import { UserData } from '../common/types'

interface Props {
    setUser: (value: UserData) => void
    setErrorMessage: (value: string) => void
}

const Login = ({setUser, setErrorMessage}: Props): JSX.Element => {
    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: ''
    })

    const handleUserData = (prop: 'email' | 'password', value: string) => {
        setUserData(prev => {
            return {
                ...prev,
                [prop]: value
            }
        })
    }

    const handleLogIn = async (e) => {
        e.preventDefault()

        if (userData.email && userData.password) {
            const res = await userService.login(userData)

            if (res.data.error) {
                setErrorMessage(res.data.error)
            }
            setUser(res.data)
        }
    }

    const handleRegister = async () => {
        if (userData.email && userData.password) {
            const res = await userService.register(userData)

            if (res.data.error) {
                setErrorMessage(res.data.error)
            }
            setUser(res.data)
        }
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogIn}>
                <input required type='email' placeholder='email' value={userData.email} onChange={(e) => handleUserData('email', e.target.value)} />

                <input required placeholder='password' value={userData.password} type='password' onChange={(e) => handleUserData('password', e.target.value)} />

                <button type='submit'>Log In</button>
            </form>
        </>
    )
}

export default Login
