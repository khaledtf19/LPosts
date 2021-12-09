const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  madeBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  commentContent: { type: String, min: 1, max: 255, required: true },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
