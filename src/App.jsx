import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [zoom, setZoom] = useState(1); // 1 = 100%
  const posterRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const downloadAsPNG = () => {
    if (!posterRef.current) return;

    html2canvas(posterRef.current, { useCORS: true, scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  return (
    <div className="poster-container">
      <div className="poster-wrapper" ref={posterRef}>
        {/* Poster Background */}
        <img
          src="/Tag W Photo Official_.png"
          alt="Poster Background"
          className="poster-bg"
        />

        {/* Upload Area */}
        <label className="upload-area">
          {uploadedImage ? (
            <div className="image-wrapper">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="uploaded-image"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
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

        {/* Editable Text Fields */}
        <p
          className="text-primary"
          contentEditable
          suppressContentEditableWarning
        ></p>
        <p
          className="text-secondary"
          contentEditable
          suppressContentEditableWarning
        ></p>
      </div>

      {/* Zoom Slider */}
      {uploadedImage && (
        <div style={{ marginTop: '15px' }}>
          <label htmlFor="zoom" style={{ marginRight: '10px' }}>Zoom:</label>
          <input
            type="range"
            id="zoom"
            min="1"
            max="2"
            step="0.01"
            value={zoom}
            onChange={handleZoomChange}
          />
        </div>
      )}

      {/* Download Button */}
      <button className="download-button" onClick={downloadAsPNG}>
        Download as PNG
      </button>
    </div>
  );
};

export default App;
