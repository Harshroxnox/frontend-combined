import React, { useState, useEffect, useRef } from 'react';
import './answer.css';

function Answer() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const rightSectionRef = useRef(null);

  // Scroll to the bottom when new question is added
  useEffect(() => {
    if (rightSectionRef.current) {
      rightSectionRef.current.scrollTop = rightSectionRef.current.scrollHeight;
    }
  }, [questions]);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPdfs(files.map(file => file.name));
    uploadFiles(files); // Upload the files
  };

  // Upload files to the backend
  const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('pdf_file', file));

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload Unsuccessful");
      }

      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        console.log("Files uploaded successfully:", data);
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
      setError(e.message);
    }
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
      const randomAnswer = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quidem? ${currentQuestion}`; // Simulate an answer
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
            <label htmlFor="fileInput" className="upload-button">
              Upload PDFs
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
            onKeyPress={handleKeyPress}
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
