const express = require("express");
const router = express.Router();

const verify = require("../auth/verifyToken");
const { commentValidation } = require("../validation/commentV");

const Post = require("../models/Post");
const Comment = require("../models/Comment");

router.post("/create", verify, async (req, res) => {
  const { error } = commentValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const post = await Post.findById(req.body.postId);
  if (!post) return res.status(401).json({ Error: "Can't found this post" });

  const comment = new Comment({
    madeBy: req.user._id,
    postId: post._id,
    commentContent: req.body.commentContent,
  });

  post.comments = [...post.comments, comment._id];
  post.commentsCount = post.commentsCount + 1;

  const savedComment = await comment.save();
  const newComment = await Comment.findById(savedComment._id).populate(
    "madeBy",
    "name email"
  );

  let string = newComment.madeBy.email;
  let str = string.split("");
  for (let i = 2; i < str.length; i++) {
    if (str[i] !== "@") {
      str[i] = ".";
    } else {
      i = str.length;
    }
    newComment.madeBy.email = str.join("");
  }

  const updatePost = await post.save();
  res.json(newComment);
});

router.delete("/delete", verify, async (req, res) => {
  const comment = await Comment.findById(req.body.commentId);
  if (!comment)
    return res.status(401).json({ Error: `Can't found this comment` });

  if (req.user._id != comment.madeBy) {
    return res.status(400).json({ Error: "You can't delete this comment" });
  }
  const post = await Post.findById(comment.postId);
  if (!post) {
    return res.status(400).json({ Error: "You can't delete this comment" });
  }
  let index = post.comments.indexOf(comment._id);
  post.comments.splice(index, 1);
  post.commentsCount = post.commentsCount - 1;

  await Comment.deleteOne({ _id: req.body.commentId });
  await post.save();
  res.json({ comment: comment._id });
});

router.post("/update", verify, async (req, res) => {
  const comment = await Comment.findById(req.body.commentId);
  if (!comment)
    return res.status(401).json({ Error: `Can't found this comment` });

  if (req.user._id != comment.madeBy) {
    return res.status(400).json({ Error: "You can't delete this comment" });
  }

  if (req.body.commentContentUpdate) {
    comment.commentContent = req.body.commentContentUpdate;
  }

  await comment.save();
  res.json({ comment: comment._id });
});

module.exports = router;
