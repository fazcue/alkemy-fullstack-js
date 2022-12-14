import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import userService from '../services/user'
import { User, UserData } from '../common/types'

interface Props {
    setUser: (value: User) => void
    errorMessage: string
    setErrorMessage: (value: string) => void
}

const Login = ({setUser, errorMessage, setErrorMessage}: Props): JSX.Element => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<'login' | 'register' | 'recover'>('login')

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

        setDisabled(true)

        if (userData.email && userData.password) {
            const res = await userService.login(userData)

            if (res.data.error) {
                setErrorMessage(res.data.error)
            }
            setUser(res.data)
        }

        setDisabled(false)
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        setDisabled(true)

        if (userData.email && userData.password) {
            const res = await userService.register(userData)

            if (res.data.error) {
                setErrorMessage(res.data.error)
            }
            setUser(res.data)
        }

        setDisabled(false)
    }

    const handleRecover = async (e) => {
        e.preventDefault()

        if (userData.email) {
            const res = await userService.recover(userData.email)

            if (res.data.error) {
                setErrorMessage(res.data.error)
            }

            console.log('recover', res.data)
        }
    }

    useEffect(() => {
        setErrorMessage(null)
    },[selectedOption])

    if (selectedOption === 'register') {
        return (
            <>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input required type='email' placeholder='email' value={userData.email} onChange={(e) => handleUserData('email', e.target.value)} disabled={disabled} />

                    <input required placeholder='password' value={userData.password} type='password' onChange={(e) => handleUserData('password', e.target.value)} disabled={disabled} />

                    <input type='submit' value={disabled ? 'Registering...' : 'Register'} className={styles.submit} disabled={disabled} />

                    <p className={styles.extraOption} onClick={() => setSelectedOption('login')}>Already have an account? <span className={styles.bold}>Login</span></p>

                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </form>
            </>
        )
    }

    if (selectedOption === 'recover') {
        return (
            <>
                <h2>Recover password</h2>
                <form onSubmit={handleRecover}>
                    <input required type='email' placeholder='email' value={userData.email} onChange={(e) => handleUserData('email', e.target.value)} disabled />

                    <input type='submit' value='currently disabled' className={styles.submit} disabled />

                    <p className={styles.extraOption} onClick={() => setSelectedOption('login')}>Go back to <span className={styles.bold}>Login</span></p>

                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </form>
            </>
        )
    }

    return (
        <>
            <h2>Login</h2>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <form onSubmit={handleLogIn}>
                <input required type='email' placeholder='email' value={userData.email} onChange={(e) => handleUserData('email', e.target.value)} disabled={disabled} />

                <input required placeholder='password' value={userData.password} type='password' onChange={(e) => handleUserData('password', e.target.value)} disabled={disabled} />

                <input type='submit' value={disabled ? 'Loggin in...' : 'Log in'} className={styles.submit} disabled={disabled} />

                <p className={styles.extraOption} onClick={() => setSelectedOption('register')}>Don`t have an account yet? <span className={styles.bold}>Register</span></p>

                <p className={styles.extraOption} onClick={() => setSelectedOption('recover')}>Forgot your password? <span className={styles.bold}>Recover it</span></p>
            </form>
        </>
    )
}

export default Login
