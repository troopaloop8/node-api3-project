const express = require('express');
const {
  get,
  getById,
  update,
  remove,
} = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  const userId = req.userId;

  get()
  .then(posts => {
    posts = posts.filter((post) => {
      return parseInt(userId) === parseInt(post.user_id);
    });

    res.status(200).json( {message: "here be yer posts", posts: posts});
  })
  .catch(err => {
    res.status(400).json({message: `Something went wrong... ${err}`})
  })
});

router.get("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  let posts;
  const userId = req.userId;
  console.log(userId);
  // getById(id)
  //   .then((post) => {
  //     res.status(200).json({ message: "here are your comments", post: post });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: "error encountered, whoops",
  //       err: err,
  //     });
  //   });
  get()
    .then((returnedPosts) => {
      posts = returnedPosts;
      posts = posts.filter((post) => {
        return parseInt(userId) === parseInt(post.user_id);
      });
      res.status(200).json({ posts: posts[id - 1] });
    })
    .catch((err) => {
      res.status(500).json({message: `Something went wrong... ${err}`});
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  remove(id)
  .then(post => {
    res.status(200).json({message: "success", post});
  })
  .catch(err => {
    res.status(400).json({message: `Something went wrong... ${err}`})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const data = req.body;
  update(id, data)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(400).json({message: `Something went wrong... ${err}`})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if (getById(req.id)) {
    next()
  } else {
    res.status(404).json({message: "A post with this ID does not exist"})
  }
}

module.exports = router;
