// Create web server
// Load the comments array
// Create a route to get all comments
// Create a route to get a single comment
// Create a route to create a comment
// Create a route to update a comment
// Create a route to delete a comment

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let comments = [];

fs.readFile('./comments.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});

app.get('/comments', (req, res) => {
  res.send(comments);
});

app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === parseInt(id));
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(newComment);
    }
  });
});

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  const comment = comments.find((comment) => comment.id === parseInt(id));
  if (comment) {
    comment.name = updatedComment.name;
    comment.email = updatedComment.email;
    comment.body = updatedComment.body;
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(comment);
      }
    });
  } else {
    res.status(404).send('Comment not found');
  }
});

app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === parseInt(id));
  if (comment) {
    comments = comments.filter((comment) => comment.id !== parseInt(id));