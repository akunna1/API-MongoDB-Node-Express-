const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('uploads'));

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/social_media_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Post schema and model
const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    default: null
  }
});

const Post = mongoose.model('Post', PostSchema);

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE a new post
app.post('/posts', upload.single('image'), (req, res) => {
  const { message } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!message) return res.status(400).send('Message is required');

  const post = new Post({ message, image_url });
  post.save()
    .then(result => res.send('Post created successfully'))
    .catch(err => res.status(500).send(err));
});

// READ all posts
app.get('/posts', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).send(err));
});

// READ a specific post by ID
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      if (!post) return res.status(404).send('Post not found');
      res.json(post);
    })
    .catch(err => res.status(500).send(err));
});

// UPDATE a post by ID
app.put('/posts/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  Post.findByIdAndUpdate(id, { message, image_url }, { new: true })
    .then(post => {
      if (!post) return res.status(404).send('Post not found');
      res.send('Post updated successfully');
    })
    .catch(err => res.status(500).send(err));
});

// DELETE a post by ID
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then(post => {
      if (!post) return res.status(404).send('Post not found');
      res.send('Post deleted successfully');
    })
    .catch(err => res.status(500).send(err));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
