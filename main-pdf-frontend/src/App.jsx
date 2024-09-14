import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Answer from "./answer.jsx";
import Header from "./header.jsx";
import History from "./history.jsx";

// Placeholder Home component with Answer inside
const Home = () => <div><Answer /></div>;

const App = () => {
  const [history, setHistory] = useState([
    { date_posted: "14-09-2024", db_pdf_name: "58ca1b05d74a7224.pdf", pdf_id: 3, pdf_name: "SIH.pdf" },
    { date_posted: "14-09-2024", db_pdf_name: "9e2be9e771d1e5ef.pdf", pdf_id: 4, pdf_name: "Gr. 12.pdf" }
  ]);

  const handleDelete = (pdfId) => {
    const updatedHistory = history.filter(pdf => pdf.pdf_id !== pdfId);
    setHistory(updatedHistory);
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Render the Answer component on the home route */}
          <Route path="/" element={<Home />} />
          
          {/* Render the History component on the history route */}
          <Route 
            path="/history" 
            element={<History history={history} onDelete={handleDelete} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
