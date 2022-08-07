export interface User {
    id: string
    email: string
}

export interface UserData {
    email: string
    password: string
}

export interface Entry {
    id: string
    category: string
    description: string
    amount: number
    date: string
}

export interface Budget {
    incomes: Entry[]
    expenses: Entry[]
    user_id: string
}

export interface Categories {
    name: string
    color: string
}
