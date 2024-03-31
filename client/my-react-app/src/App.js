import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [videos, setVideos] = useState([]);
  const [format, setFormat] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false); 

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    setUploading(true); // Start overall upload process
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('videos', selectedFiles[i]);
    }
    formData.append('format', format);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      setVideos(response.data);
      alert("video uploaded successfully!")
      setSelectedFiles([]);
      setFormat('');
      setUploading(false); 
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again later.');
      setUploading(false); 
    }
  };

  return (
    <div>
      <h2>Upload Videos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select id="format" value={format} onChange={handleFormatChange}>
      
          </select>
        </div>
        <div>
          <input type="file" id="videos" name="videos" multiple onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit" disabled={uploading}>Upload</button>
          {uploading && <span>Uploading...</span>}
        </div>
      </form>
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name} - Status: Pending</li>
            ))}
          </ul>
        </div>
      )}
      {videos.length > 0 && (
        <div>
          <h3>Uploaded Videos:</h3>
          <ul>
            {videos?.uploaded?.map((video, index) => (
              <li key={index}>{video.filename} - Status: {video.status}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadForm;



