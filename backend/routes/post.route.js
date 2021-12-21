const fs = require('fs');
const express = require('express');
const router = express.Router();
const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const fileUpload = require('../middleware/fileUpload');

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

const getTotalPosts = async () => {
  let posts = await PostModel.find({}).lean()
  return posts.length
}

const getTotalPostsFromUser = async (uid) => {
  let posts = await PostModel.find({creatorID : uid}).lean()
  return posts.length
}

/* ROUTE */
router.get('/', async function(req, res, next) {
  let users = await UserModel.find({}).lean()
  let posts = await PostModel.find({}).lean().sort({createdTime: -1})

  for (let i = 0; i < posts.length; i++) {
    for (let u = 0; u < users.length; u++) {
      if (posts[i].creatorID == users[u]._id) {
        posts[i].creatorName = users[u].name
        posts[i].creatorImage = users[u].image
        break
      }
    }
  } 
  
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(posts))
});

router.get('/num-posts/:numPosts', async function(req, res, next) {
  let numPosts = Number.parseInt(req.params.numPosts)
  let totalPosts = await getTotalPosts()
  let users = await UserModel.find({}).lean()
  let posts = await PostModel.find({}).limit(numPosts).lean().sort({createdTime: -1})

  for (let i = 0; i < posts.length; i++) {
    for (let u = 0; u < users.length; u++) {
      if (posts[i].creatorID == users[u]._id) {
        posts[i].creatorName = users[u].name
        posts[i].creatorImage = users[u].image
        break
      }
    }
  } 
  
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    code : 0,
    data : {
      totalPosts : totalPosts,
      posts : posts
    }
  }))
});

router.get('/u/:uid/num-posts/:numPosts', async function(req, res, next) {
  let uid = req.params.uid
  let numPosts = Number.parseInt(req.params.numPosts)
  let totalPosts = await getTotalPostsFromUser(uid)
  let user = await UserModel.find({_id : uid}).lean()
  let posts = await PostModel.find({creatorID : uid}).limit(numPosts).lean().sort({createdTime: -1})

  for (let i = 0; i < posts.length; i++) {
    posts[i].creatorName = user[0].name
    posts[i].creatorImage = user[0].image
  } 
  
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    code : 0,
    data : {
      totalPosts : totalPosts,
      posts : posts
    }
  }))
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

  await PostModel.updateOne(
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

router.post('/:postID/delete', async function(req, res) {
  let postID = req.params.postID
  
  let post = await PostModel.deleteOne(
    { _id: postID }
  )
  .exec()                  // Fails on both promise and callback versions
  .catch(err => {
      console.log(`caught error`, err);         // Never gets caught!!
  });

  if (post.image) {
    let filePath = `uploads/${post.image}`; 
    fs.unlinkSync(filePath);
  }

  res.end()
});

router.post('/:postID/comment/:commentID/delete', async function(req, res) {
  let postID = req.params.postID
  let commentID = req.params.commentID

  console.log(postID);
  console.log(commentID);


  await PostModel.updateOne(
    { _id : postID },
    { $pull : {comments : { _id : commentID}} }
  )

  res.end()
});

module.exports = router;
