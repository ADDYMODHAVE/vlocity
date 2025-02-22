// server/models/Poll.js
const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Poll", PollSchema);
