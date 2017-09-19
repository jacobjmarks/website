const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log("Database connected.");
});

const postSchema = mongoose.Schema({
    posted: Date,
    title: String,
    body: String,
    tags: [String]
});

const Post = mongoose.model('Post', postSchema);

module.exports.posts = (callback) => {
    Post.find((err, posts) => {
        if (err) return console.error(err);
        callback(posts);
    });
}

module.exports.addPost = (post, callback) => {
    new Post(post).save((err, _) => {
        if (err) return console.error(err);
        callback();
    });
}

module.exports.deletePost = (post_id, callback) => {
    Post.findByIdAndRemove(post_id, (err, _) => {
        if (err) console.error(err);
    })
}

module.exports.truncate = () => {
    Post.remove({}, (err) => {
        if (err) return console.error(err);
    });
}