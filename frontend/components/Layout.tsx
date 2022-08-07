import styles from './Layout.module.css'
import Footer from './Footer'

interface Props {
    children: JSX.Element | JSX.Element[]
    header: JSX.Element
    fullCentered?: boolean
}

const Layout = ({ children, header, fullCentered = false }: Props): JSX.Element => {
    return (
        <div className={styles.container} id='outer-container'>
            {header}

            <div id='page-wrap' className={`${styles.pageWrap} ${fullCentered && styles.fullCentered}`}>
                {children}
            </div>
            
            <Footer />
        </div>
    )
}

export default Layout
