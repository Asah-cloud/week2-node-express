// app.js - Week 2 Express API

require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Custom middleware: log every request with method, URL, status and duration
function logger(req, res, next) {
    const start = Date.now()
    res.on('finish', () => {
        const ms = Date.now() - start
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`)
    })
    next()
}

app.use(logger)
app.use(express.json())

// Serves public/index.html at GET /
app.use(express.static(path.join(__dirname, 'public')))

// Fallback for GET / if the static page is missing
app.get('/', (req, res) => {
    res.send('My Week 2 API!')
})

app.post('/user', (req, res) => {
    const { name, email } = req.body || {}

    if (!name || !email) {
        return res.status(400).json({ error: 'Both name and email are required' })
    }

    res.send(`Hello, ${name}!`)
})

app.get('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} profile`)
})

// 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` })
})

// Error handler (e.g. malformed JSON body)
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON in request body' })
    }
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
