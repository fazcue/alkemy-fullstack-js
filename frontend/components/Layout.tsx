import styles from './Layout.module.css'
import { Budget } from '../common/types'
import Header from './Header'
import Footer from './Footer'

interface Props {
    children: JSX.Element | JSX.Element[]
    budget?: Budget
	setBudget?: (value: Budget) => void
	balance?: number
	userID?: string
}

const Layout = ({ children, budget, setBudget, balance, userID }: Props): JSX.Element => {
    return (
        <div className={styles.container} id='outer-container'>
            <Header budget={budget} setBudget={setBudget} balance={balance} userID={userID} />
            <div id='page-wrap' className={styles.pageWrap}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
