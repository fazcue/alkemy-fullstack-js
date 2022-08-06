import styles from './SidebarLeft.module.css'

interface Props {
    children: JSX.Element
}

const SidebarLeft = ({ children }: Props): JSX.Element => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default SidebarLeft
