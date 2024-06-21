// server/models/Comment.js
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Comment", CommentSchema);
