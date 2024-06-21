// client/src/pages/CreatePoll.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../services/api";
import Header from "../components/Header";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const history = useNavigate();

  const handleAddOption = () => {
    setOptions([...options, { text: "" }]);
  };

  const handleChangeOption = (index, text) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await createPoll({ question, options }, token);
    history("/");
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center flex-column border p-5">
        <h2>Create Poll</h2>
        <div className="m-2">
          <label>Question:</label>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>
        <div>
          {options.map((option, index) => (
            <div key={index} className="m-2">
              <label>Option {index + 1}:</label>
              <input type="text" value={option.text} onChange={(e) => handleChangeOption(index, e.target.value)} required />
            </div>
          ))}
          <button type="button" onClick={handleAddOption} className="m-2 btn btn-primary">
            Add Option
          </button>
        </div>
        <button type="submit" className="m-2 btn btn-primary">
          Create Poll
        </button>
      </form>
    </>
  );
};

export default CreatePoll;
