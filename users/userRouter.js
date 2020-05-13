const express = require('express');
const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
} = require("./userDb.js");
const postDb = require('../posts/postDb.js');

const router = express.Router();
const postRouter = require('../posts/postRouter');
router.use('/:id/posts', IdPasser, postRouter);

router.post('/', validateUser, (req, res) => {
  // do your magic!
  insert(req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(400).json({ error: `Something went wrong... ${err}`})
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  console.log(req.params);
  const data = req.body;
  data.user_id = id;
  if (data) {
    postDb.insert(data)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(400).json({message: `Something went wrong... ${err}`})
    })
  }
});

router.get('/',  (req, res) => {
  // do your magic!
  get()
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(400).json({message: `Something went wrong... ${err}`})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  getUserPosts(id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(400).json({ message: `Something went wrong... ${err}`})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  remove(id)
  .then(post => {
    res.status(200).json({message: "success", post})
  })
  .catch(err => {
    res.status(400).json({ message: `Something went wrong... ${err}`})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const data = req.body;
  update(id, data)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(400).json({ message: `Something went wrong... ${err}`})
  })

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  const valid = getById(id);
  valid
  .then(res => {
    if (res.name) {
      req.user = res;
      next();
    } else {
      res.status(400).json({message: "Someting went wrong"})
    }
  })
  .catch(err => {
    res.status(500).json({message: `ERROR ERROR ERROR: ${err}`})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body) {
    req.body.name ? next() : res.status(400).json({message: "You gotta post the required text field bruh!"})
  } else {
    req.status(400).json({message: "We need your user data, bruh!"})
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body) {
    req.body.text ? next() : res.status(400).json({message: "You gotta post the required text field bruh!"})
  } else {
    req.status(400).json({message: "We need your post data, bruh!"})
  }
}

function IdPasser(req, res, next) {
  const { id } = req.params;
  req.userId = id;

  next();
}

module.exports = router;
