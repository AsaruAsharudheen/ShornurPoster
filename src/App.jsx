import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0); // left-right
  const [offsetY, setOffsetY] = useState(0); // up-down
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

  return (
    <div className="poster-container">
      <div className="poster-wrapper" ref={posterRef}>
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
                style={{
                  transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`,
                }}
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

      {/* Image Controls */}
      {uploadedImage && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="zoom" style={{ marginRight: '10px' }}>Zoom:</label>
            <input
              type="range"
              id="zoom"
              min="1"
              max="2"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="offsetX" style={{ marginRight: '10px' }}>Left/Right:</label>
            <input
              type="range"
              id="offsetX"
              min="-50"
              max="50"
              step="1"
              value={offsetX}
              onChange={(e) => setOffsetX(parseInt(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="offsetY" style={{ marginRight: '10px' }}>Up/Down:</label>
            <input
              type="range"
              id="offsetY"
              min="-50"
              max="50"
              step="1"
              value={offsetY}
              onChange={(e) => setOffsetY(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}

      <button className="download-button" onClick={downloadAsPNG}>
        Download as PNG
      </button>
    </div>
  );
};

export default App;
