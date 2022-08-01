const express = require('express')
const app = express()

//Routes
app.get('/', (req, res) => {
    res.send('<h1>Express installed</h1>')
})


//Unknown endpoints
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

//Listen
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
