// server/controllers/pollController.js
const Poll = require("../models/Poll");
const Comment = require("../models/Comment");

exports.createPoll = async (req, res) => {
  const { question, options } = req.body;
  const poll = new Poll({ question, options, author: req.user._id });
  await poll.save();
  req.user.createdPolls.push(poll);
  await req.user.save();
  res.status(201).json(poll);
};

exports.getPolls = async (req, res) => {
  const polls = await Poll.find().populate("author", "username").populate("comments");
  res.status(200).json(polls);
};

exports.votePoll = async (req, res) => {
  const { pollId, optionId } = req.params;
  const poll = await Poll.findById(pollId);
  const option = poll.options.id(optionId);
  if (!poll.votes.includes(req.user._id)) {
    option.votes++;
    poll.votes.push(req.user._id);
    await poll.save();
    req.user.votedPolls.push(poll);
    await req.user.save();
    res.status(200).json(poll);
  } else {
    res.status(200).json({ message: "You have already voted" });
  }
};

exports.addComment = async (req, res) => {
  const { pollId } = req.params;
  const { text } = req.body;
  const comment = new Comment({ text, author: req.user._id, poll: pollId });
  await comment.save();
  const poll = await Poll.findById(pollId);
  poll.comments.push(comment);
  await poll.save();
  res.status(201).json(comment);
};

exports.getPoll = async (req, res) => {
  const poll = await Poll.findById(req.params.pollId).populate("comments").populate("author", "username");
  if (poll) {
    res.json(poll);
  } else {
    res.status(404).json({ message: "Poll not found" });
  }
};
