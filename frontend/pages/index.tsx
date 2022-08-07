import budgetService from '../services/budgets'
import { useState, useEffect } from 'react'
import { Budget, User } from '../common/types'
import Login from '../components/Login'
import UserMenu from '../components/UserMenu'
import Card from '../components/Card'
import SmallScreensOnly from '../components/SmallScreensOnly'
import NewEntry from '../components/NewEntry'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Main from '../components/Main'
import SidebarLeft from '../components/SidebarLeft'
import FlexRow from '../components/FlexRow'
import EntryDetails from '../components/EntryDetails'
import Seo from '../components/Seo'

const Home = () => {
	const [budget, setBudget] = useState<Budget>(null)

	const [balance, setBalance] = useState<number>(0)
	const [incomeBalance, setIncomeBalance] = useState<number>(null)
	const [expensesBalance, setExpensesBalance] = useState<number>(null)

	const [user, setUser] = useState<User>(null)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const [expensesCategories, setExpensesCategories] = useState<string[]>([])
	const [selectedExpenseCat, setSelectedExpenseCat] = useState<string>(null)

	const getBalance = () => {
		const income = budget.incomes.reduce(
			(prev, curr) => prev + curr.amount,
			0
		)
		const expense = budget.expenses.reduce(
			(prev, curr) => prev + curr.amount,
			0
		)

		setIncomeBalance(income)
		setExpensesBalance(expense)
		setBalance(income - expense)
	}

	const handleOnChangeCategory = (e) => {
		setSelectedExpenseCat(e.target.value)
	}

	const handleLogOut = () => {
		setUser(null)
	}

	const cleanStates = () => {
		setBudget(null)
		setBalance(0)
		setIncomeBalance(null)
		setExpensesBalance(null)
		setExpensesCategories([])
		setSelectedExpenseCat(null)
	}

	//Custom header (for avoiding prop drilling)
	const CustomHeader = (): JSX.Element => {
		if (!user || !user.id) {
			return (
				<Header>
					<Menu />
				</Header>
			)
		}

		if (!budget) {
			return (
				<Header>
					<Menu userID={user.id} handleLogOut={handleLogOut} />
				</Header>
			)
		}

		return (
			<Header>
				<Menu budget={budget} setBudget={setBudget} balance={balance} userID={user.id} handleLogOut={handleLogOut} />
			</Header>
		)
	}

	//Effects
	useEffect(() => {
		if (user?.id) {
			budgetService
				.get(user.id)
				.then((response) => setBudget(response.data[0]))
		} else {
			cleanStates()
		}
	}, [user])

	useEffect(() => {
		if (budget) {
			//get unique expenses categories
			const uniqueCategories = new Set(budget.expenses.map(expense => expense.category))
			setExpensesCategories([...uniqueCategories])

			getBalance()
		}
	},[budget])

	if (!user || !user.id) {
		return (
			<Layout
				header={<CustomHeader />}
				fullCentered
			>
				<Seo title='Budget management' description='Keep track of your incomes and expenses' />
				<FlexRow>
					<Main alignItems='center'>
						<h2 style={{textAlign: 'center'}}>Budget management tool</h2>

						<p style={{textAlign: 'center'}}>Keep track of your incomes and expenses.</p>

						<Card>
							<>
								<Login
									setUser={setUser}
									setErrorMessage={setErrorMessage}
									errorMessage={errorMessage}
								/>
							</>
						</Card>
						<h3 style={{textAlign: 'center'}}>IMPORTANT</h3>

						<p style={{textAlign: 'center'}}>This is an Alkemy challenge, build by Facundo Azcue.</p>

						<p style={{textAlign: 'center'}}>Use it only as a test. Any data storaged will be delete at any point.</p>
					</Main>
				</FlexRow>
			</Layout>
		)
	}

	if (!budget) {
		return (
			<Layout
				header={<CustomHeader />}
			>
				<Seo title='Budget management' description='Keep track of your incomes and expenses' />
				<FlexRow>
					<Main>
						<h2>Loading data... please wait</h2>
					</Main>
				</FlexRow>
			</Layout>
		)
	}

	return (
		<Layout
			header={<CustomHeader />}
		>
			<Seo title='Budget management' description='Keep track of your incomes and expenses' />
			<FlexRow>
				<SidebarLeft>
					<>
						<Card>
							<UserMenu user={user} handleLogOut={handleLogOut} />
						</Card>
						<Card>
							<NewEntry
								budget={budget}
								setBudget={setBudget}
								userID={user.id}
							/>
						</Card>
					</>

				</SidebarLeft>
				<Main maxWidth="750px" width='100%'>
					<>
						<SmallScreensOnly>
							<Card maxWidth='750px' width='100%'>
								<UserMenu user={user} handleLogOut={handleLogOut} />
							</Card>
						</SmallScreensOnly>
						{
							(budget.incomes.length === 0 && budget.expenses.length === 0) ? <h2>Nothing added yet</h2>
						:
							<>
								{budget.incomes.length > 0 && (
									<>
										<h2>Income - <small>${incomeBalance}</small></h2>
										{budget.incomes.map((income, index) => (
											<EntryDetails
												budget={budget}
												setBudget={setBudget}
												entry={income}
												index={index}
												isIncome
												userID={user.id}
												key={income.id}
											/>
										))}
									</>
								)}

								{budget.expenses.length > 0 && (
									<>
										<h2>Expenses - <small>${expensesBalance}</small></h2>
										{expensesCategories.length > 0 && <select value={selectedExpenseCat ? selectedExpenseCat : 'Show All'} onChange={handleOnChangeCategory}>
											<option value='Show All'>Show All</option>
											{expensesCategories.map((cat, index) => <option value={cat} key={index}>{cat}</option>)}
										</select>}

										{(selectedExpenseCat && selectedExpenseCat !== 'Show All') ? 
											budget.expenses.map((expense, index) => {
												if (expense.category === selectedExpenseCat) {
													return (
														<EntryDetails
															budget={budget}
															setBudget={setBudget}
															entry={expense}
															index={index}
															userID={user.id}
															key={expense.id}
														/>
													)
												}
											})
										:
										budget.expenses.map((expense, index) => (
											<EntryDetails
												budget={budget}
												setBudget={setBudget}
												entry={expense}
												index={index}
												userID={user.id}
												key={expense.id}
											/>
										))
										}

									</>
								)}
							</>
						}
					</>
				</Main>
			</FlexRow>
		</Layout>
	)
}

export default Home
