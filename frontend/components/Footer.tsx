import styles from './Footer.module.css'

const Footer = (): JSX.Element => {
	return (
		<footer className={styles.container}>
			<h4>FullStack JS - Alkemy challenge</h4>
			<p>by Facundo Azcue | 2022</p>
		</footer>
	)
}

export default Footer
