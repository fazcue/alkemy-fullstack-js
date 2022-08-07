import styles from './Card.module.css'

interface Props {
    children: JSX.Element
    width?: string
    maxWidth?: string
}

const Card = ({ children, width = null, maxWidth = null }: Props): JSX.Element => {
    return (
        <div className={styles.container} style={{width: width, maxWidth: maxWidth}}>
            {children}
        </div>
    )
}

export default Card
