const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const fs = require('fs');

const database = require('./libs/database.js');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("GET /");
    res.render('index.pug');
});

app.post('/getPosts', (req, res) => {
    console.log("POST /getPosts");
    database.posts((err, posts) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        res.send(posts);
    })
});

app.post('/addPost', (req, res) => {
    console.log("POST /addPost");
    database.addPost(req.body, (err) => {
        if (err) {
            console.error(err.stack);
            return res.status(500).end();
        }
        res.end();
    });
});

app.post('/deletePost/:id', (req, res) => {
    console.log(`POST /deletePost/${req.params.id}`)
    database.deletePost(req.params.id, (err) => {
        if (err) {
            res.status(500).end();
        }
        res.end();
    })
});

app.post('/truncatePosts', (req, res) => {
    console.log("POST /truncatePosts");
    database.truncatePosts((err) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        res.end();
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

fs.rmdir('./public/js/pugtemplates-post.js', (_) => {});
fs.writeFile(
    './public/js/pugtemplate-post.js',
    pug.compileFileClient('./views/post.pug', {name: 'pugtemplate_post'})
);