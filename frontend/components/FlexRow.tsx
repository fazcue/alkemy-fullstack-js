import styles from './FlexRow.module.css'

interface Props {
    children: JSX.Element | JSX.Element[]
}

const FlexRow = ({children}: Props): JSX.Element => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default FlexRow
