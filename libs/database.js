const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log("Database connected.");
});

const postSchema = mongoose.Schema({
    date_posted: {type: Date, required: true, default: Date.now},
    title: {type: String, required: true},
    body: {type: String, required: true},
    tags: {type: [String], required: true}
});

const Post = mongoose.model('Post', postSchema);

module.exports.posts = (callback) => {
    Post.find((err, posts) => {
        callback(err, posts);
    }).sort({ date_posted: -1 });
}

module.exports.addPost = (post, callback) => {
    new Post({
        title: post.title,
        body: post.body,
        tags: (post.tags) ? post.tags.split(' ') : undefined
    }).save((err, _) => {
        callback(err);
    });
}

module.exports.deletePost = (post_id, callback) => {
    Post.findByIdAndRemove(post_id, (err, _) => {
        callback(err);
    });
}

module.exports.truncatePosts = (callback) => {
    Post.remove({}, (err) => {
        callback(err);
    });
}