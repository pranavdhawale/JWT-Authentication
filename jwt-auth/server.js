const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const posts = [
    {
        username: 'Pranav',
        title: 'Post 1'
    },
    {
        username: 'Noddy',
        title: 'Post 2'
    }
];

app.get('/posts', (req, res) => {
    res.json(posts);
    }
);

app.get('/login', (req, res) => {
    res.send('Login');
    }
);

app.listen(3000, () => {
    console.log('Server started on port 3000');
    }
);