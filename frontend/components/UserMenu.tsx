import styles from './UserMenu.module.css'
import { User, Budget } from '../common/types'

interface Props {
    user: User
    setUser: (value: User) => void
    setBudget: (value: Budget) => void
}

const UserMenu = ({ user, setUser, setBudget}: Props): JSX.Element => {
    const handleLogOut = () => {
        setUser(null)
        setBudget(null)
    }

    const [nickname, rest] = user.email.split('@')

    return (
        <>
            <p>Welcome, <span className={styles.nickname}>{nickname}</span></p>
            <button onClick={handleLogOut}>Log out</button>
        </>
    )
}

export default UserMenu
