import styles from '../styles/Home.module.css'
import budgetService from '../services/budgets'
import { useState, useEffect } from 'react'

const Home = () => {
	const [budgets, setBudgets] = useState(null)

	useEffect(() => {
		budgetService.getAll().then((response) => setBudgets(response.data[0]))
	}, [])

	useEffect(() => {
		console.log(budgets)
	}, [budgets])

	if (!budgets) {
		return (
			<div className={styles.container}>
				<main className={styles.main}>
					<h2>Loading data...</h2>
				</main>
			</div>
		)
	}

	if (budgets.length === 0) {
		return (
			<div className={styles.container}>
				<main className={styles.main}>
					<h2>No data</h2>
				</main>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h2>Incomes</h2>
				{budgets.income.map((inc, index) => (
					<h3 key={index}>{inc}</h3>
				))}

				<h2>Outcomes</h2>
				{budgets.outcome.map((out, index) => (
					<h3 key={index}>{out}</h3>
				))}

				<h2>Balance</h2>
				<h3>{budgets.balance}</h3>
			</main>
		</div>
	)
}

export default Home
