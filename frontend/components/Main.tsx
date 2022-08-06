import styles from './Main.module.css'

interface Props {
    children: JSX.Element[] | JSX.Element
    maxWidth?: string
    width?: string
}

const Main = ({ children, maxWidth, width = null }: Props): JSX.Element => {
    return (
        <main className={styles.container} style={{maxWidth: maxWidth ? maxWidth : null, width: width}}>
            {children}
        </main>
    )
}

export default Main
