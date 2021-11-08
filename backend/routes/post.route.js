const express = require('express');
const router = express.Router();

const PostModel = require('../models/post.model')

/* ROUTE */
router.get('/', async function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let posts = await PostModel.find({}).lean()
  // need to join user collection to get avatar, name, ...
  res.end(JSON.stringify(posts))
});

router.post('/', function(req, res) {
  let today  = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let hour = String(today.getHours()).padStart(2, '0');
  let minute = String(today.getMinutes()).padStart(2, '0')
  let createdTime = dd + '/' + mm + '/' + yyyy + ', ' + hour + ':' + minute;

  let post = {
    creatorID: req.body.creatorID,
    createdTime: createdTime,
    content: req.body.content,
    imgURL: req.body.imgURL,
    totalLike: 0,
    totalComment: 0,
    comments: []
  }

  PostModel.create(post, function(err) {
    if (err) {
        console.log(err);
    }
  })

  res.end()
});

module.exports = router;
