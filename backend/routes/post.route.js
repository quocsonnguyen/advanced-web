const express = require('express');
const router = express.Router();
const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const fileUpload = require('../middleware/fileUpload')

const getTime = () => {
  let today  = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let hour = String(today.getHours()).padStart(2, '0');
  let minute = String(today.getMinutes()).padStart(2, '0')
  let createdTime = dd + '/' + mm + '/' + yyyy + ', ' + hour + ':' + minute;
  return createdTime
}

/* ROUTE */
router.get('/', async function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let users = await UserModel.find({}).lean()
  let posts = await PostModel.find({}).lean().sort({createdTime: -1})

  // for (let i = 0; i < posts.length; i++) {
  //   for (let j = 0; j < posts[i].comments.length; j++) {
  //     for (let u = 0; u < users.length; u++) {
  //       if (posts[i].comments[j].commenterID == users[u]._id) {
  //         posts[i].comments[j].commenterName = users[u].name
  //         posts[i].comments[j].commenterImage = users[u].image
  //         break
  //       }
  //     }
  //   }
  // }

  for (let i = 0; i < posts.length; i++) {
    for (let u = 0; u < users.length; u++) {
      if (posts[i].creatorID == users[u]._id) {
        posts[i].creatorName = users[u].name
        posts[i].creatorImage = users[u].image
        break
      }
    }
  } 
  // need to join user collection to get avatar, name, ...
  res.end(JSON.stringify(posts))
});

router.post('/', fileUpload.single('postImage'), function(req, res) {
  let createdTime = getTime()
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
  let post = await PostModel.findOne({ _id: postID }).lean()
  let users = await UserModel.find({}).lean()

  for (let i = 0; i < post.comments.length; i++) {
    for (let u = 0; u < users.length; u++) {
      if (post.comments[i].commenterID == users[u]._id) {
        post.comments[i].commenterName = users[u].name
        post.comments[i].commenterImage = users[u].image
        break
      }
    }
  }
  res.end(JSON.stringify(post))
});

router.post('/:postID', fileUpload.single('postImage'), async function(req, res) {
  let postID = req.params.postID
  let imageName = req.body.postImage === '' ? '' : req.file.filename

  await PostModel.findOneAndUpdate(
    { _id: postID },
    {
      content : req.body.content,
      image : imageName,
      videoURL : req.body.videoURL
    }
  )
  res.end()
});

router.post('/:postID/comment', function(req, res) {
  let postID = req.params.postID
  let createdTime = getTime()
  let comment = {commenterID: req.body.commenterID, content: req.body.content, createdTime: createdTime}
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

router.post('/:postID/delete', function(req, res) {
  let postID = req.params.postID
  PostModel.findOneAndDelete(
    { _id: postID }
  )
  .exec()                  // Fails on both promise and callback versions
  .catch(err => {
      console.log(`caught error`, err);         // Never gets caught!!
  });
  res.end()
});

module.exports = router;
