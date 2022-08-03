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

//Single supabase client for interacting with database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

//Routes
const API_BASE = '/api/budgets'

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Express installed</h1>')
})

app.get(API_BASE, async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('budgets')
        .select()

    res.json(data)
})

app.get(`${API_BASE}/:userID`, async (req: Request, res: Response) => {
    const userID = req.params.userID

    const { data, error } = await supabase
        .from('budgets')
        .select()
        .eq('user_id', userID)

    res.json(data)
})

app.post(API_BASE, async (req: Request, res: Response) => {
    const newBudget = req.body

    const { data, error } = await supabase
        .from('budgets')
        .insert([newBudget])

    console.log('error', error);
    
    res.json(data ? data : error)
})

app.post('/api/user/register', async (req: Request, res: Response) => {
    const newUser = req.body

    const { user, session, error } = await supabase.auth.signUp(newUser)

    //Create empty budget for new user
    if (user?.id) {
        const newBudget = {
            income: [],
            outcome: [],
            balance: 0,
            user_id: user.id
        }

        const { data, error } = await supabase
            .from('budgets')
            .insert([newBudget])
    }

    res.json(user?.id ? {id: user.id, email: user.email} : {error: error.message})
})

app.post('/api/user/login', async (req: Request, res: Response) => {
    const userInfo = req.body

    const { user, session, error } = await supabase.auth.signIn(userInfo)

    res.json(user?.id ? {id: user.id, email: user.email} : {error: error.message})
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
