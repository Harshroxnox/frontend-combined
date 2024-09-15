import React, { useState, useEffect, useRef } from 'react';
import './answer.css';

function Answer() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answers, setAnswers] = useState([]);

  // Reference to the container where the questions are displayed
  const rightSectionRef = useRef(null);

  // Scroll to the bottom of the right2 div when a new question is added
  useEffect(() => {
    if (rightSectionRef.current) {
      rightSectionRef.current.scrollTop = rightSectionRef.current.scrollHeight;
    }
  }, [questions]);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPdfs(files.map(file => file.name));
  };

  // Handle delete of a PDF
  const handleDelete = (index) => {
    setPdfs(pdfs.filter((_, i) => i !== index));
    setSelectedPdfs(selectedPdfs.filter((_, i) => i !== index));
  };

  // Handle selecting a PDF
  const handleSelect = (pdf) => {
    if (!selectedPdfs.includes(pdf)) {
      setSelectedPdfs([...selectedPdfs, pdf]);
    }
  };

  // Handle question submit
  const handleSubmitQuestion = () => {
    if (currentQuestion.trim() !== '') {
      const randomAnswer = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quidem? Corporis illum porro id autem iusto, commodi eum. Sunt ab, enim, tempore quos perspiciatis dolores pariatur aperiam nobis laudantium accusantium error, rerum voluptate numquam! ${currentQuestion}`; // Simulate an answer
      setQuestions([...questions, currentQuestion]);
      setAnswers([...answers, randomAnswer]);
      setCurrentQuestion(''); // Reset the input box
    }
  };

  // Handle "Enter" key press in the textarea
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent newline in textarea
      handleSubmitQuestion();
    }
  };

  
const UploadForm = document.getElementById("upload");

UploadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formdata = new FormData(form);
    console.log(formdata);

    const token = localStorage.getItem('token');

    fetch("http://127.0.0.1:5000/upload", {
        method : 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
          },
        body : formdata
    }).then((response) => {
        if(!response.ok){
            console.log(response);
            throw new Error("Upload Unsuccessful");
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        if('error' in data){
            console.log(data.error);
        }
        else{
            
        }
    }).catch((e) => {
        console.error(`Error : ${e}`);
    });
});


  return (
    <div className="container">
      <div className="leftsection">
        <div className="left">
          <div className="small-box">
            {pdfs.length > 0 ? (
              <div className="pdf-list">
                {pdfs.map((pdf, index) => (
                  <div
                    key={index}
                    className={`pdf-item ${selectedPdfs.includes(pdf) ? 'active' : ''}`}
                    onClick={() => handleSelect(pdf)}
                  >
                    {pdf}
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from triggering on parent
                        handleDelete(index);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No PDFs uploaded yet.</p>
            )}
          </div>
          <form action="" id="upload" method='post'>
          <input
            type="file"
            id="fileInput"
            name='pdf_file'
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="fileInput" className="upload-button" >
            <button type='submit'>Upload PDFs</button>
          </label>
          </form>
        </div>
        <div className="left2">
          <div className="small-box">
            {selectedPdfs.length > 0 ? (
              <div className="pdf-list">
                {selectedPdfs.map((pdf, index) => (
                  <div key={index} className="pdf-item">
                    {pdf}
                  </div>
                ))}
              </div>
            ) : (
              <p>No PDFs selected yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className="rightsection">
        <div className="right2" ref={rightSectionRef}>
          {answers.length === 0 ? (
            <div className="cognitive-engine">
              Cognitive Engine Active... Awaiting questions...
            </div>
          ) : (
            questions.map((question, index) => (
              <div key={index} className="qa-pair">
                <div className="question-box">Q: {question}</div>
                <div className="answer-box">A: {answers[index]}</div>
              </div>
            ))
          )}
        </div>
        <div className="right">
          <textarea
            className="question-input"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyPress={handleKeyPress} // Handle Enter key press here
            placeholder="Ask your question here..."
          />
          <button className="submit-button" onClick={handleSubmitQuestion}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Answer;
