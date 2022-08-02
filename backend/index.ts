import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()

app.use(cors())

//Single supabase client for interacting with database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

//Routes
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Express installed</h1>')
})

app.get('/api/budgets', async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('budgets')
        .select()

    res.json(data)
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
