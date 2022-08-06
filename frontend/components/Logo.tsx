import Link from 'next/link'
import styles from './Logo.module.css'

const Logo = (): JSX.Element => {
	return (
		<Link href='/' prefetch={false}>
			<a>
				<h1 className={styles.title}>FullStack JS</h1>
				<span>Alkemy challenge</span>
			</a>
		</Link>
	)
}

export default Logo
