const express = require('express');
const router = express.Router();
const PostModel = require('../models/post.model')
const fileUpload = require('../middleware/fileUpload')


/* ROUTE */
router.get('/', async function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let posts = await PostModel.find({}).lean().sort({createdTime: -1})
  // need to join user collection to get avatar, name, ...
  res.end(JSON.stringify(posts))
});

router.post('/', fileUpload.single('postImage'), function(req, res) {
  let today  = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let hour = String(today.getHours()).padStart(2, '0');
  let minute = String(today.getMinutes()).padStart(2, '0')
  let createdTime = dd + '/' + mm + '/' + yyyy + ', ' + hour + ':' + minute;

  let imageName = req.body.postImage === '' ? '' : req.file.filename

  let post = {
    creatorID: req.body.creatorID,
    createdTime: createdTime,
    content: req.body.content,
    image: imageName,
    videoURL : req.body.videoURL,
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

router.get('/:postID', async function(req, res) {
  let postID = req.params.postID
  let post = await PostModel.findOne({ _id: postID })
  res.end(JSON.stringify(post))
});

router.post('/:postID/comment', function(req, res) {
  let postID = req.params.postID
  let comment = {commenterID: req.body.commenterID, content: req.body.content}
  PostModel.findOneAndUpdate(
    { _id: postID },
    { 
      $push: { comments: comment },
      $inc: { totalComment: 1 }
    }
  )
  .exec()                  // Fails on both promise and callback versions
  .catch(err => {
      console.log(`caught error`, err);         // Never gets caught!!
  });
  res.end()
});

router.post('/:postID/like', function(req, res) {
  let postID = req.params.postID
  PostModel.findOneAndUpdate(
    { _id: postID },
    { 
      $inc: { totalLike: 1 }
    }
  )
  .exec()                  // Fails on both promise and callback versions
  .catch(err => {
      console.log(`caught error`, err);         // Never gets caught!!
  });
  
  res.end()
});

router.post('/:postID/unlike', function(req, res) {
  let postID = req.params.postID
  PostModel.findOneAndUpdate(
    { _id: postID },
    { 
      $inc: { totalLike: -1 }
    }
  )
  .exec()                  // Fails on both promise and callback versions
  .catch(err => {
      console.log(`caught error`, err);         // Never gets caught!!
  });
  res.end()
});

module.exports = router;
