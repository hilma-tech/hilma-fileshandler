import React, { useState } from 'react';
import './App.css';
import FileInput from './fileshandler/FilesInput';
import useFiles from './fileshandler/useFiles';

function App() {
  const filesUploader = useFiles();

  const [imageObj, setImageObj] = useState(null);
  const [audioObj, setAudioObj] = useState(null);
  const [message, setMessage] = useState("");

  const send = async () => {
    await filesUploader.fetch("/hello", {
      method: "POST",
      body: JSON.stringify({
        name: "michael",
        message,
        imageId: imageObj.id,
        audioId: audioObj.id
      })
    });
  }

  const handleImageChange = e => {
    setImageObj(e.target.value);
  };

  const handleAudioChange = e => {
    setAudioObj(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          FilesHandler
        </h1>

        image
        <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} />
        {
          imageObj &&
          <img src={imageObj.link} />
        }

        audio
        <FileInput type="audio" filesUploader={filesUploader} onChange={handleAudioChange} />
        {
          audioObj &&
          <>
            <audio src={audioObj.link} controls />
          </>
        }

        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />

        <button onClick={send}>send</button>
      </header>

    </div>
  );
}

export default App;
