import React,{useState, useEffect} from "react";
import QuestionItem from './QuestionItem';


function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteQuestion = id => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions(prevQuestions =>
          prevQuestions.filter(question => question.id !== id)
        );
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
  };

  const handleCorrectAnswerChange = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correctIndex,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(prevQuestions =>
          prevQuestions.map(question =>
            question.id === id ? data : question
          )
        );
      })
      .catch(error => {
        console.error('Error updating correct answer:', error);
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
            onCorrectAnswerChange={handleCorrectAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}


export default QuestionList;
