import React from 'react';
import './history.css';

const History = ({ history, onDelete }) => {
  return (
    <div className="history-container">
      <h2>PDF History</h2>
      <div className="history-list">
        {history.map((pdf) => (
          <div className="history-item" key={pdf.pdf_id}>
            <div className="pdf-details">
              <p className="pdf-name">{pdf.pdf_name}</p>
              <p className="pdf-date">Posted on: {pdf.date_posted}</p>
            </div>
            <div className="button-group">
              <a href={`/download/${pdf.db_pdf_name}`} className="download-link">
                Download
              </a>
              <button
                className="delete-button"
                onClick={() => onDelete(pdf.pdf_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
