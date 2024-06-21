// client/src/pages/PollPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { getPoll, votePoll, addComment } from "../services/api";
import Header from "../components/Header";

const socket = io("http://localhost:5000");

const PollPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchPoll = async () => {
      const data = await getPoll(pollId);
      setPoll(data);
    };

    fetchPoll();
    socket.on("voteUpdate", fetchPoll);
    socket.on("commentUpdate", fetchPoll);

    return () => {
      socket.off("voteUpdate", fetchPoll);
      socket.off("commentUpdate", fetchPoll);
    };
  }, [pollId]);

  const handleVote = async (optionId) => {
    const token = localStorage.getItem("token");
    const data = await votePoll(pollId, optionId, token);
    if (data.message === "You have already voted") {
      alert("You have already voted");
    }
    socket.emit("vote", pollId);
  };

  const handleComment = async () => {
    const token = localStorage.getItem("token");
    await addComment(pollId, { text: comment }, token);
    setComment("");
    socket.emit("comment", pollId);
  };

  return (
    poll && (
      <>
        <Header />
        <div>
          <h2>{poll.question}</h2>
          <ul>
            {poll.options.map((option) => (
              <li key={option._id}>
                {option.text} - <b>{option.votes}</b>
                <button className="btn btn-primary" onClick={() => handleVote(option._id)}>
                  Vote
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h3>Comments</h3>
            {poll.comments.map((comment) => (
              <p key={comment._id}>{comment.text}</p>
            ))}
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="btn btn-primary" onClick={handleComment}>
              Add Comment
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default PollPage;
