import styles from './Header.module.css'
import { Budget } from '../common/types'
import Menu from './Menu'

interface Props {
	budget: Budget
	setBudget: (value: Budget) => void
	balance: number
	userID: string
}

const Header = ({budget, setBudget, balance, userID}: Props): JSX.Element => {
	return (
		<header className={styles.container}>
			<Menu budget={budget} setBudget={setBudget} balance={balance} userID={userID} />
		</header>
	)
}

export default Header
