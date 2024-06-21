// client/src/components/PollList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPolls } from "../services/api";
import Header from "./Header";

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const data = await getPolls();
      setPolls(data);
    };

    fetchPolls();
  }, []);

  return (
    <div>
      <Header />
      <h2>Polls</h2>
      <ul>
        {polls.map((poll) => (
          <li key={poll._id}>
            <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollList;
