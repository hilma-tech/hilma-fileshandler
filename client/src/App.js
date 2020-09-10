import React, { useState } from 'react';
import './App.css';
import FileInput from './fileshandler/FileInput';
import useFiles from './fileshandler/useFiles';
import FunctionalUse from './FunctionalUse';
import ClassUse from './ClassUse';

function App() {
  const filesUploader = useFiles();

  const [show, setShow] = useState(false);
  const [showClass, setShowClass] = useState(false);

  const [audioObj, setAudioObj] = useState(null);

  const [uploadedAudio, setUploadedAudio] = useState("");

  const send = async () => {
    const res = await filesUploader.fetch("/hello", {
      method: "POST",
      body: JSON.stringify({
        name: "michael",
        audioId: audioObj.id,
      })
    });
    const data = await res.json();
    setUploadedAudio(data.audio);
  }


  const login = async () => {
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        username: "michael",
        password: "Qw12345"
      })
    });
  }



  const handleAudioChange = e => {
    setAudioObj(e.target.value);
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>
          FilesHandler
        </h1>
        
        audio
        <FileInput type="audio" filesUploader={filesUploader} onChange={handleAudioChange} />
        {
          audioObj &&
          <>
            <audio src={audioObj.link} controls />
          </>
        }


        {
          uploadedAudio &&
          <audio src={uploadedAudio} controls />
        }
     
        <button onClick={send}>send</button>

        <div style={{ display: "flex" }}>
          <button onClick={() => setShow(current => !current)}>toggle show</button>
          <button onClick={() => setShowClass(current => !current)} >toggle show class</button>
          <button onClick={login}>login</button>
        </div>


        {
          show &&
          <FunctionalUse />
        }

        {
          showClass &&
          <ClassUse />
        }
      </header>

    </div>
  );
}

export default App;
