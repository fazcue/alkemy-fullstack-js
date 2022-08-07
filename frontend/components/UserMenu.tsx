import styles from './UserMenu.module.css'
import { User } from '../common/types'

interface Props {
    user: User
    handleLogOut: () => void
}

const UserMenu = ({ user, handleLogOut }: Props): JSX.Element => {
    const [nickname, rest] = user.email.split('@')

    return (
        <>
            <p>Welcome, <span className={styles.nickname}>{nickname}</span></p>
            <button onClick={handleLogOut}>Log out</button>
        </>
    )
}

export default UserMenu
