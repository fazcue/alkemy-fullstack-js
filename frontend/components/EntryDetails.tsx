import { Entry, Budget } from "../common/types"
import { categories } from "../common/categories"
import { nanoid } from "nanoid"
import { useState } from "react"
import ModalBox from "./ModalBox"
import budgetService from "../services/budgets"
import styles from './EntryDetails.module.css'

interface Props {
    budget: Budget
    setBudget: (value: Budget) => void
    entry: Entry
    index: number
    isIncome?: boolean
    userID: string
}

const EntryDetails = ({budget, setBudget, entry, index, isIncome = false, userID}: Props): JSX.Element => {
    const [type] = useState<'incomes' | 'expenses'>(isIncome ? 'incomes' : 'expenses')
    const [category] = useState(entry.category ? categories.find(cat => cat.name === entry.category) : null)

    const [newEntry, setNewEntry] = useState<Entry>(entry)

    const [deleteDisabled, setDeleteDisabled] = useState(false)
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false)

    const deleteEntry = async () => {
        setDeleteDisabled(true)
        const newBudget = {
            ...budget,
            [type]: budget[type].filter((entry, i) => index !== i)
        }

        if (userID) {
            const res = await budgetService.remove(userID, newBudget)

            if (res?.data) {
                console.log('deleted', res.data)
                setBudget(res.data)
            }
        }
        setDeleteDisabled(false)
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newBudget = {
            ...budget,
            [type]: budget[type].map((entry, i) => {
                if (index === i) {
                    return {
                        ...newEntry,
                        id: nanoid()
                    }
                }
                return entry
            })
        }

        if (userID) {
            const res = await budgetService.update(userID, newBudget)

            if (res?.data) {
                setBudget(res.data)
                setEditModalStatus(false)
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.entry} style={{backgroundColor: index % 2 === 0 ? 'var(--light-gray)' : 'var(--dark-gray)'}}>

                <div>
                    {entry.category && <span className={styles.category} style={{backgroundColor: category.color}}>{entry.category}</span>}

                    <span className={styles.description}>{entry.description}</span>
                </div>

                <span className={styles.amount} style={{color: isIncome ? 'var(--dark-cyan)' : 'var(--crimson)'}}>{`$${entry.amount}`}</span>
                
            </div>

            <button className={styles.edit} onClick={() => setEditModalStatus(true)}>Edit</button>

            <button className={styles.delete} onClick={deleteEntry} disabled={deleteDisabled}>Delete</button>

            <ModalBox
                modalStatus={editModalStatus}
                setModalStatus={setEditModalStatus}
            >
                <>
                    <h3>Edit entry: {entry.description}</h3>

                    <form onSubmit={handleSubmit}>
                        {!isIncome && <label>
                            Category:
                            <select value={newEntry.category} onChange={(e) => handleOnChange('category', e.target.value)}>
                                {categories.map((cat, index) => <option value={cat.name} key={index}>{cat.name}</option>)}
                            </select>
                        </label>}

                        <label>
                            Description: {60 - newEntry.description.length} characters remaining
                            <textarea required rows={5} maxLength={60} placeholder="Description" value={newEntry.description} onChange={(e) => handleOnChange('description', e.target.value)} />
                        </label>

                        <label>
                            Amount:
                            <input required placeholder="Amount" value={newEntry.amount ? newEntry.amount : ''} onChange={(e) => handleOnChange('amount', e.target.value)} />
                        </label>

                        <button type="submit">Save changes</button>
                    </form>
                </>
            </ModalBox>
        </div>
    )
}

export default EntryDetails
