import styles from './Card.module.css'

interface Props {
    children: JSX.Element
}

const Card = ({ children }: Props): JSX.Element => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Card
