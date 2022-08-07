import styles from './Main.module.css'

interface Props {
    children: JSX.Element[] | JSX.Element
    maxWidth?: string
    width?: string
    alignItems?: 'center'
}

const Main = ({ children, maxWidth = null, width = null, alignItems = null }: Props): JSX.Element => {
    return (
        <main className={styles.container} style={{maxWidth: maxWidth, width: width, alignItems: alignItems}}>
            {children}
        </main>
    )
}

export default Main
