import React, { useState } from 'react';
import "./uploads.css"


/Function for formating uploads pdfs and select pdfs / 
function Upload() {
    const [pdfs, setPdfs] = useState([]);
    const [selectedPdfs, setSelectedPdfs] = useState([]);
  
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
                          &times; {/* Use multiplication sign for delete icon */}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No PDFs uploaded yet.</p>
                )}
              </div>
              <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="fileInput" className="upload-button">
                Upload PDFs
              </label>
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
            <div className="right2">Right Section 2</div>
            <div className="right">Right Section</div>
          </div>
        </div>
      );
    }

    export default Upload;