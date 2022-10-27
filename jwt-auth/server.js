require('dotenv').config();

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const users = []

const posts = [
    {
        username: 'pranav',
        title: 'Post 1'
    },
    {
        username: 'deep',
        title: 'Post 2'
    },
    {
        username: 'noddy',
        title: 'Post 3'
    }
]

app.get('/users', (req, res) => {
    res.json(users)
});

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
});


app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
});


app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            // res.send('Success')
            const username = req.body.name
            const user = { name: username }
            
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken })
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
});

function authenticateToken(req, res, next) {
    // Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // if we have the authHeader then return the authHeader token portion which we spilt by the space
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});