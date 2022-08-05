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
    outcomes: Entry[]
    user_id: string
}

export interface Categories {
    name: string
    color: string
}
