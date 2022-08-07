import styles from './SmallScreensOnly.module.css'

interface Props {
    children: JSX.Element
}

const SmallScreensOnly = ({children}: Props): JSX.Element => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default SmallScreensOnly
