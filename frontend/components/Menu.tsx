import styles from './Menu.module.css'
import { Budget } from '../common/types'
import { useState } from 'react'
import ModalBox from './ModalBox'
import NewEntry from './NewEntry'
import Logo from './Logo'

interface Props {
	budget?: Budget
	setBudget?: (value: Budget) => void
	balance?: number
	userID?: string
	handleLogOut?: () => void
}

const Menu = ({ budget, setBudget, balance = 0, userID = null, handleLogOut }: Props): JSX.Element => {
	const [modalStatus, setModalStatus] = useState<boolean>(false)

	const toggleModal = () => {
		setModalStatus(prev => !prev)
	}

	const Items = () => {
		return (
			<div className={styles.items}>
				<div className={styles.balance} style={{width: !userID ? '100%' : null}}>
					<span className={styles.balanceTitle}>$</span>
					<span style={{color: balance === 0 ? 'var(--almost-dark)' : balance > 0 ? 'var(--dark-cyan)' : 'var(--crimson)', fontWeight: 'bold'}}>{balance}</span>
				</div>

				{userID &&
					<>
						<span className={styles.addNewButton} onClick={toggleModal}>Add new</span>

						<span className={styles.logOutButton} onClick={handleLogOut}>&#10132;</span>
					</>
				}
			</div>
		)
	}

	return (
		<nav className={styles.container}>
			<Logo />
			<Items />
			{userID && 
				<ModalBox
					modalStatus={modalStatus}
					setModalStatus={setModalStatus}
				>
					<NewEntry budget={budget} setBudget={setBudget} userID={userID} isModal setModalStatus={setModalStatus} />
				</ModalBox>
			}
		</nav>
	)
}

export default Menu
