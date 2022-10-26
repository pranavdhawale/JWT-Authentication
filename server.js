const express = require('express');
const app = express();

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


app.listen(3000, () => {
    console.log('Server started on port 3000');
    }
);