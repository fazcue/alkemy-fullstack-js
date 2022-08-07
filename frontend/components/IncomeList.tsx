import { Budget } from '../common/types'
import EntryDetails from "./EntryDetails"

interface Props {
    budget: Budget
    setBudget: (value: Budget) => void
    userID: string
    incomeBalance: number
}

const IncomeList = ({budget, setBudget, userID, incomeBalance}: Props): JSX.Element => {
    return (
        <>
            <h2>Income - <small>${incomeBalance}</small></h2>
            {budget.incomes.map((income, index) => (
                <EntryDetails
                    budget={budget}
                    setBudget={setBudget}
                    entry={income}
                    index={index}
                    isIncome
                    userID={userID}
                    key={income.id}
                />
            ))}
        </>
    )
}

export default IncomeList
