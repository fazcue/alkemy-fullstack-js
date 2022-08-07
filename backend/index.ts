import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
	console.log('Method', request.method)
	console.log('Path', request.path)
	console.log('Body', request.body)
	next()
}

app.use(requestLogger)

//interfaces
interface Entry {
    id: string
    category: string
    description: string
    amount: number
    date: string
}

interface Budget {
    created_at: string
    id: number
    incomes: Entry[]
    expenses: Entry[]
    user_id: string
}

//Supabase client for interacting with database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

//ROUTES
const API_BASE = '/api/budgets'

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Express installed</h1>')
})

//get budget
app.get(`${API_BASE}/:userID`, async (req: Request, res: Response) => {
    const userID = req.params.userID

    const { data, error } = await supabase
        .from('budgets')
        .select()
        .eq('user_id', userID)

    res.json(data)
})

//update budget
app.put(`${API_BASE}/:userID`, async (req: Request, res: Response) => {
    const userID = req.params.userID
    const newBudget = req.body

    const { data, error } = await supabase
        .from<Budget>('budgets')
        .update(newBudget)
        .match({ user_id: userID })

    res.json(error ? error.message : {incomes: data[0].incomes, expenses: data[0].expenses, user_id: data[0].user_id})
})

//delete budget
app.delete(`${API_BASE}/:userID`, async (req: Request, res: Response) => {
    const userID = req.params.userID
    const newBudget = req.body

    const { data, error } = await supabase
        .from<Budget>('budgets')
        .update(newBudget)
        .match({ user_id: userID })

    res.json(error ? error.message : {incomes: data[0].incomes, expenses: data[0].expenses, user_id: data[0].user_id})
})

//add user
app.post('/api/user/register', async (req: Request, res: Response) => {
    const newUser = req.body

    const { user, session, error } = await supabase.auth.signUp(newUser)

    //Create empty budget for new user
    if (user?.id) {
        const newBudget = {
            incomes: [],
            expenses: [],
            user_id: user.id
        }

        const { data, error } = await supabase
            .from('budgets')
            .insert([newBudget])
    }

    res.json(user?.id ? {id: user.id, email: user.email} : {error: error.message})
})

//login user
app.post('/api/user/login', async (req: Request, res: Response) => {
    const userInfo = req.body

    const { user, session, error } = await supabase.auth.signIn(userInfo)

    res.json(user?.id ? {id: user.id, email: user.email} : {error: error.message})
})

//recover password (currently disabled in frontend)
app.post('/api/user/recover', async (req: Request, res: Response) => {
    const { email } = req.body

    console.log('recovering', email)

    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

    res.json(!error ? {error: 'Email sent. Check your inbox'} : {error: error.message})
})

//Unknown endpoints
const unknownEndpoint = (req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

//Listen
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
