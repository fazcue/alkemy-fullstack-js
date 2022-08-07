import styles from './Header.module.css'

interface Props {
	children: JSX.Element
}

const Header = ({ children }: Props): JSX.Element => {
	return (
		<header className={styles.container}>
			{children}
		</header>
	)
}

export default Header
