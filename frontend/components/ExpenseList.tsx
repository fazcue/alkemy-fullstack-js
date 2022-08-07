import { Budget } from '../common/types'
import EntryDetails from './EntryDetails'
import { useState, useEffect } from 'react'

interface Props {
	budget: Budget
	setBudget: (value: Budget) => void
	userID: string
	expensesBalance: number
}

const ExpenseList = ({budget, setBudget, userID, expensesBalance}: Props): JSX.Element => {
    const [expensesCategories, setExpensesCategories] = useState<string[]>([])
	const [selectedExpenseCat, setSelectedExpenseCat] = useState<string>(null)

    const handleOnChangeCategory = (e) => {
		setSelectedExpenseCat(e.target.value)
	}

    useEffect(() => {
		//If budget, set expenses categories AND balance
		if (budget) {
			const uniqueCategories = new Set(budget.expenses.map(expense => expense.category))
			setExpensesCategories([...uniqueCategories])
		}
	},[budget])

	return (
		<>
			<h2>Expenses - <small>${expensesBalance}</small></h2>

			{expensesCategories.length > 0 && (
				<select
					value={selectedExpenseCat ? selectedExpenseCat : 'Show All'}
					onChange={handleOnChangeCategory}
				>
					<option value="Show All">Show All</option>
					{expensesCategories.map((cat, index) => (
						<option value={cat} key={index}>
							{cat}
						</option>
					))}
				</select>
			)}

			{selectedExpenseCat && selectedExpenseCat !== 'Show All'
				? budget.expenses.map((expense, index) => {
						if (expense.category === selectedExpenseCat) {
							return (
								<EntryDetails
									budget={budget}
									setBudget={setBudget}
									entry={expense}
									index={index}
									userID={userID}
									key={expense.id}
								/>
							)
						}
				  })
				: budget.expenses.map((expense, index) => (
						<EntryDetails
							budget={budget}
							setBudget={setBudget}
							entry={expense}
							index={index}
							userID={userID}
							key={expense.id}
						/>
				  ))}
		</>
	)
}

export default ExpenseList
