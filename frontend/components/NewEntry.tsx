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
    const [newEntry, setNewEntry] = useState<Entry>({
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
        //Dont allow line breaks
        const clearValue = value.split('').filter(c => c !== '\n').join('')

        setNewEntry(prev => {
            return {
                ...prev,
                [prop]: prop === 'amount' ? +clearValue.replace(/\D/g, '') : clearValue
            }
        })
    }

    const addNewEntry = async (e) => {
        e.preventDefault()

        const entry: Entry = {
            ...newEntry,
            id: nanoid(),
            category: type === 'expenses' ? newEntry.category : null
        }

        setDisabled(true)
        const newBudget: Budget = {
            ...budget,
            [type]: [...budget[type], entry]
        }

        if (userID) {
            const res = await budgetService.update(userID, newBudget)

            if (res?.data) {
                setBudget(res.data)
            }
        }
        
        setNewEntry({
            id: null,
            category: entry.category,
            description: '',
            amount: null,
            date: entry.date
        })
        setDisabled(false)
        
        if (isModal) {
            setModalStatus(false)
        }
	}

    return (
        <>
            <h3 className={styles.title}>Add new Entry</h3>

            <form onSubmit={addNewEntry}>

                <small>{60 - newEntry.description.length} characters remaining</small>
                <textarea required rows={5} maxLength={60} placeholder="Description" value={newEntry.description} onChange={(e) => handleOnChange('description', e.target.value)} />

                <input required placeholder="Amount" value={newEntry.amount ? newEntry.amount : ''} onChange={(e) => handleOnChange('amount', e.target.value)} />

                <select required value={type} onChange={handleType}>
                    <option value='incomes'>Income</option>
                    <option value='expenses'>Expenses</option>
                </select>

                {type === 'expenses' && 
                    <select required value={newEntry.category ? newEntry.category : categories[0].name} onChange={(e) => handleOnChange('category', e.target.value)}>
                        {categories.map((cat, index) => <option value={cat.name} key={index}>{cat.name}</option>)}
                    </select>
                }

                <input required type='date' value={newEntry.date ? newEntry.date : ''} onChange={(e) => handleOnChange('date', e.target.value)} />

                <input type='submit' value={disabled ? 'Adding... wait' : 'Add new'} className={styles.submit} disabled={disabled} />
            </form>
        </>
    )
}

export default NewEntry
