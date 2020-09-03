import React, { useState } from 'react';
import './App.css';
import FileInput from './fileshandler/FilesInput';
import useFiles from './fileshandler/useFiles';

function App() {
  const filesUploader = useFiles();

  const [imageObj, setImageObj] = useState(null);
  const [audioObj, setAudioObj] = useState(null);
  const [fileObj, setFileObj] = useState(null);
  const [videoObj, setVideoObj] = useState(null);
  const [message, setMessage] = useState("");

  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedAudio, setUploadedAudio] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState("");

  const send = async () => {
    const res = await filesUploader.fetch("/hello", {
      method: "POST",
      body: JSON.stringify({
        name: "michael",
        message,
        imageId: imageObj.id,
        audioId: audioObj.id,
        fileId: fileObj.id
      })
    });

    const data = await res.json();

    setUploadedImage(data.image);
    setUploadedAudio(data.audio);
    setUploadedVideo(data.video);
    alert("done");
  }

  const signUp = async () => {
    await fetch("/signUp", {
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

  const getInfo = async () => {
    console.log("here")
    await fetch("/info", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmMGNlMjI4LTIyNTctNDE1ZC1hM2ZkLTMxYjFhOWFjY2Q0MiIsInVzZXJuYW1lIjoibWljaGFlbCIsInR5cGUiOiJVc2VyIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNTk5MTE4OTQ3LCJleHAiOjE1OTkxMjQ5NDd9.KQBB69eKDBBuEJeLBZe8zgN486MP5lnH58ow1kkGUCY`
      },
      body: JSON.stringify({
      })
    });
  }


  const handleImageChange = e => {
    setImageObj(e.target.value);
  };

  const handleAudioChange = e => {
    setAudioObj(e.target.value);
  };

  const handleFileChange = e => {
    setFileObj(e.target.value);
  }

  const handleVideoChange = e => {
    setVideoObj(e.target.value);
  }

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

        file
        <FileInput type="file" filesUploader={filesUploader} onChange={handleFileChange} />

        video
        <FileInput type="video" filesUploader={filesUploader} onChange={handleVideoChange} />
        {
          videoObj &&
          <video src={videoObj.link} controls />
        }
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />

        {
          uploadedAudio &&
          <audio src={uploadedAudio} controls />
        }
        {
          uploadedImage &&
          <img src={uploadedImage} />
        }

        {
          uploadedVideo &&
          <video src={uploadedVideo} controls />
        }
        <button onClick={send}>send</button>
        <div style={{ display: "flex" }}>
          <button onClick={signUp}>sign up</button>
          <button onClick={login}>login</button>
          <button onClick={getInfo}>fetch</button>
        </div>
      </header>

    </div>
  );
}

export default App;
