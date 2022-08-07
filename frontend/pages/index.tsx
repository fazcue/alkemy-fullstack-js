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
import IncomeList from '../components/IncomeList'
import ExpenseList from '../components/ExpenseList'
import Seo from '../components/Seo'

const Home = () => {
	const [user, setUser] = useState<User>(null)

	const [budget, setBudget] = useState<Budget>(null)

	const [balance, setBalance] = useState<number>(0)
	const [incomeBalance, setIncomeBalance] = useState<number>(null)
	const [expensesBalance, setExpensesBalance] = useState<number>(null)

	const [errorMessage, setErrorMessage] = useState<string>('')

	const getBalance = () => {
		//get income balance
		const income = budget.incomes.reduce((prev, curr) => prev + curr.amount, 0)

		//get expense balance
		const expense = budget.expenses.reduce((prev, curr) => prev + curr.amount, 0)

		//save each balance
		setIncomeBalance(income)
		setExpensesBalance(expense)
		setBalance(income - expense)
	}

	const handleLogOut = () => {
		setUser(null)
	}

	const cleanStates = () => {
		setBudget(null)
		setBalance(0)
		setIncomeBalance(null)
		setExpensesBalance(null)
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

	useEffect(() => {
		//If user id, then get budget, else reset states
		if (user?.id) {
			budgetService
				.get(user.id)
				.then((response) => setBudget(response.data[0]))
		} else {
			cleanStates()
		}
	}, [user])

	useEffect(() => {
		//If budget, get balance
		if (budget) {
			getBalance()
		}
	},[budget])

	if (!user || !user.id) { //No user, show login page
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
							<Login
								setUser={setUser}
								setErrorMessage={setErrorMessage}
								errorMessage={errorMessage}
							/>
						</Card>
						<h3 style={{textAlign: 'center'}}>IMPORTANT</h3>
						<p style={{textAlign: 'center'}}>This is an Alkemy challenge, build by Facundo Azcue.</p>
						<p style={{textAlign: 'center'}}>Use it only as a test. Any data storaged will be delete at any point.</p>
					</Main>
				</FlexRow>
			</Layout>
		)
	}

	if (!budget) { //No budget, show loading page
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
							(budget.incomes.length === 0 && budget.expenses.length === 0) ? <><h2>Nothing to show yet</h2><p>Add your first income or expense.</p></>
						:
							<>
								{budget.incomes.length > 0 && <IncomeList budget={budget} setBudget={setBudget} userID={user.id} incomeBalance={incomeBalance} />}
								{budget.expenses.length > 0 && <ExpenseList budget={budget} setBudget={setBudget} userID={user.id} expensesBalance={expensesBalance} />}
							</>
						}
					</>
				</Main>
			</FlexRow>
		</Layout>
	)
}

export default Home
