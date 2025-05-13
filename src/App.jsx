import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const posterRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const downloadAsPNG = () => {
    if (posterRef.current) {
      html2canvas(posterRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'poster.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="poster-container">
      <div className="poster-wrapper" ref={posterRef}>
        <img
          src="/Tag W Photo Official_.png"
          alt="Poster Background"
          className="poster-bg"
        />

        {/* Upload area */}
        <label className="upload-area second">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="image-layer second"
            />
          ) : (
            <span className="upload-text">Click to upload image</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        {/* Editable Text */}
        <p
          className="custom-text-second"
          contentEditable
          suppressContentEditableWarning
        ></p>
        <p
          className="custom-text-third"
          contentEditable
          suppressContentEditableWarning
        ></p>
      </div>

      {/* Download Button */}
      <button className="download-button" onClick={downloadAsPNG}>
        Download as PNG
      </button>
    </div>
  );
};

export default App;
