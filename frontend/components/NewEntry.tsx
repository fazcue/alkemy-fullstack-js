import { Entry, Budget } from "../common/types"
import { categories } from '../common/categories'
import styles from './NewEntry.module.css'
import budgetService from "../services/budgets"
import { nanoid } from 'nanoid'
import { useState } from "react"

interface Props {
    budget: Budget
    setBudget: (value: Budget) => void
    userID: string
    isModal?: boolean
    setModalStatus?: (value: boolean) => void
}

const NewEntry = ({budget, setBudget, userID, isModal = false, setModalStatus = () => {}}: Props): JSX.Element => {
    const [disabled, setDisabled] = useState(false)
    const [type, setType] = useState<'incomes' | 'expenses'>('incomes')
    const [entry, setEntry] = useState<Entry>({
        id: null,
        category: categories[0].name,
        description: '',
        amount: null,
        date: null
    })

    const handleType = (e) => {
        setType(e.target.value)
    }

    const handleOnChange = (prop, value) => {
        setEntry(prev => {
            return {
                ...prev,
                [prop]: prop === 'amount' ? +value.replace(/\D/g, '') : value
            }
        })
    }

    const addNewEntry = async (e) => {
        e.preventDefault()

        const newEntry: Entry = {
            ...entry,
            id: nanoid(),
            category: type === 'expenses' ? entry.category : null
        }

        setDisabled(true)
        const newBudget: Budget = {
            ...budget,
            [type]: [...budget[type], newEntry]
        }

        if (userID) {
            const res = await budgetService.update(userID, newBudget)

            if (res?.data) {
                console.log('added', res.data)
                setBudget(res.data)
            }
        }
        
        setEntry({
            id: null,
            category: entry.category,
            description: '',
            amount: null,
            date: null
        })
        setDisabled(false)
        
        if (isModal) {
            setModalStatus(false)
        }
	}

    return (
        <>
            <h3>Add new Entry</h3>

            <form onSubmit={addNewEntry}>
                <textarea required rows={5} maxLength={60} placeholder="Description" value={entry.description} onChange={(e) => handleOnChange('description', e.target.value)} />

                <input required placeholder="Amount" value={entry.amount ? entry.amount : ''} onChange={(e) => handleOnChange('amount', e.target.value)} />

                <select required value={type} onChange={handleType}>
                    <option value='incomes'>Income</option>
                    <option value='expenses'>Expenses</option>
                </select>

                {type === 'expenses' && 
                    <select required value={entry.category ? entry.category : categories[0].name} onChange={(e) => handleOnChange('category', e.target.value)}>
                        {categories.map((cat, index) => <option value={cat.name} key={index}>{cat.name}</option>)}
                    </select>
                }

                <input type='submit' value='Add' className={styles.submit} disabled={disabled} />
            </form>
        </>
    )
}

export default NewEntry
