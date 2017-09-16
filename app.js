const express = require('express');

const app = express();

const port = 80;

app.get('/', (req, res) => {
    res.render('index.pug');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});