const express = require("express");
const router = express.Router();

const verify = require("../auth/verifyToken");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const { postValidation } = require("../validation/postV");

// Get All
router.get("/", verify, async (req, res) => {
  let posts = await Post.find()
    .populate("madeBy", "name email")
    .sort("-updated");

  for (let z = 0; z < posts.length; z++) {
    let string = posts[z].madeBy.email;
    let str = string.split("");
    for (let i = 2; i < str.length; i++) {
      if (str[i] !== "@") {
        str[i] = ".";
      } else {
        i = str.length;
      }
    }
    posts[z].madeBy.email = str.join("");
  }

  res.json(posts);
});

// Create
router.post("/create", verify, async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).json({ Error: error.details[0].message });

  const user = await User.findById(req.user._id);
  const post = new Post({
    madeBy: user._id,
    postContent: req.body.postContent,
    postTitle: req.body.postTitle,
  });
  user.posts = [...user.posts, post._id];

  const savedPost = await post.save();
  const newPost = await Post.findById(post._id).populate(
    "madeBy",
    "name email"
  );

  let string = newPost.madeBy.email;
  let str = string.split("");
  for (let i = 2; i < str.length; i++) {
    if (str[i] !== "@") {
      str[i] = ".";
    } else {
      i = str.length;
    }
    newPost.madeBy.email = str.join("");
  }

  const updateUser = await user.save();
  res.json(newPost);
});

// Delete
router.delete("/delete", verify, async (req, res) => {
  const post = await Post.findById(req.body.postId);
  if (!post) return res.status(401).json({ Error: `Can't found this post` });

  if (req.user._id != post.madeBy) {
    return res.status(400).json({ Error: "You can't delete this post" });
  }

  const user = await User.findById(post.madeBy);
  let index = user.posts.indexOf(post._id);
  user.posts.splice(index, 1);

  await Comment.deleteMany({ postId: req.body.postId });
  await Post.findByIdAndDelete(req.body.postId);
  await user.save();
  res.json({ post: post._id });
});

// Update
router.post("/update", verify, async (req, res) => {
  const post = await Post.findById(req.body.postId);
  if (!post) return res.status(400).json({ Error: `Can't found this post` });

  if (req.user._id != post.madeBy) {
    return res.status(400).json({ Error: "You can't update this post" });
  }

  if (req.body.postTitleUpdate) {
    post.postTitle = req.body.postTitleUpdate;
  }
  if (req.body.postContentUpdate) {
    post.postContent = req.body.postContentUpdate;
  }

  await post.save();
  res.json({ post: post._id });
});

// GET BY ID
router.post("/", verify, async (req, res) => {
  let postId = req.query.id;
  const post = await Post.findById(postId)
    .populate("madeBy", "name email")
    .populate({
      path: "comments",
      populate: { path: "madeBy", select: "name email" },
    });

  if (!post) return res.status(400).json({ Error: "Invalid ID" });

  for (let z = 0; z < post.comments.length; z++) {
    let string = post.comments[z].madeBy.email;
    let str = string.split("");
    for (let i = 2; i < str.length; i++) {
      if (str[i] !== "@") {
        str[i] = ".";
      } else {
        i = str.length;
      }
    }
    post.comments[z].madeBy.email = str.join("");
  }

  res.json(post);
});

// All comments for a post
router.get("/comments", verify, async (req, res) => {
  id = req.query.id;
  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ Error: "Invalid ID" });

  const comments = await Comment.find({ postId: post._id });
  res.json(comments);
});

// Get all user posts
router.post("/user", verify, async (req, res) => {
  let userId = req.query.id;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ Error: "Invalid ID" });

  const posts = await Post.find({ madeBy: user._id })
    .populate("madeBy", "name email")
    .sort("-updated");
  res.json(posts);
});

router.post("/like", verify, async (req, res) => {
  let PostId = req.query.id;

  const post = await Post.findById(PostId);
  if (!post) return res.status(400).json({ Error: "Invalid ID" });

  if (post.likesFrom.includes(req.user._id)) {
    let index = post.likesFrom.indexOf(req.user._id);
    post.likesFrom.splice(index, 1);
    post.likes--;
  } else {
    post.likesFrom.push(req.user._id);
    post.likes++;
  }

  await post.save();
  res.json(post.likes);
});

module.exports = router;
