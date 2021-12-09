const express = require("express");
const authRoute = require("../auth/auth");
const postsRoute = require("../routes/posts");
const commentsRoute = require("../routes/comment");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/posts", postsRoute);
  app.use("/api/user", authRoute);
  app.use("/api/comments", commentsRoute);
};
