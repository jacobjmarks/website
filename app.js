const express = require('express');
const pug = require('pug');
const fs = require('fs');

const database = require('./libs/database.js');

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index.pug');
});

app.post('/getPosts', (req, res) => {
    database.posts((err, posts) => {
        if (err) {
            return res.statusCode(500).end();
        }
        res.send(posts);
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

fs.rmdir('./public/js/pugtemplates-post.js', (_) => {});
fs.writeFile(
    './public/js/pugtemplate-post.js',
    pug.compileFileClient('./views/post.pug', {name: 'pugtemplate_post'})
);