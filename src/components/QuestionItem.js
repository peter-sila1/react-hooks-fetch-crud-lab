import React from "react";
import QuestionList from "./QuestionList";


function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteQuestion = () => {
    onDelete(id); 
  };
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onDelete={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
