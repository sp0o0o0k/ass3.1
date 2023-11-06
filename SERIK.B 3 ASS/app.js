const express = require('express');
const app = express();
const port = 3000;
const blogPosts = [];
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { blogPosts });
});

app.get('/add-post', (req, res) => {
    res.render('add-post');
});

app.post('/create-post', (req, res) => {
    const newPost = {
        id: blogPosts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    blogPosts.push(newPost);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);
    res.render('post', { post });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
