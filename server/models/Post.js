const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  madeBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postContent: { type: String, min: 1, max: 300, required: true },
  postTitle: { type: String, min: 1, max: 100, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  commentsCount: { type: Number, default: 0 },
  likesFrom: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likes: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
