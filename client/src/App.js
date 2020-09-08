import React, { useState } from 'react';
import './App.css';
import FileInput from './fileshandler/FilesInput';
import useFiles from './fileshandler/useFiles';
import FunctionalUse from './FunctionalUse';
import ClassUse from './ClassUse';

function App() {
  // const filesUploader = useFiles();

  const [show, setShow] = useState(false);
  const [showClass, setShowClass] = useState(false);

  // const [imageObj, setImageObj] = useState(null);
  // const [audioObj, setAudioObj] = useState(null);
  // const [fileObj, setFileObj] = useState(null);
  // const [videoObj, setVideoObj] = useState(null);
  // const [message, setMessage] = useState("");

  // const [uploadedImage, setUploadedImage] = useState("");
  // const [uploadedAudio, setUploadedAudio] = useState("");
  // const [uploadedVideo, setUploadedVideo] = useState("");

  // const send = async () => {
  //   console.log(audioObj)
    // const res = await filesUploader.fetch("/hello", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: "michael",
    //     message,
    //     imageId: imageObj.id,
    //     // audioId: audioObj.id,
    //     // fileId: fileObj.id
    //   })
    // });

    // const data = await res.json();

    // setUploadedImage(data.image);
    // setUploadedAudio(data.audio);
    // setUploadedVideo(data.video);
    // alert("done");
  // }

  // const signUp = async () => {
  //   await fetch("/signUp", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: "michael",
  //       password: "Qw12345"
  //     })
  //   });
  // }

  // const login = async () => {
  //   await fetch("/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: "michael",
  //       password: "Qw12345"
  //     })
  //   });
  // }

  // const getInfo = async () => {
  //   console.log("here")
  //   await fetch("/info", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": 'application/json',
  //     },
  //     body: JSON.stringify({
  //     })
  //   });
  // }


  // const handleImageChange = e => {
  //   setImageObj(e.target.value);
  // };

  // const handleAudioChange = e => {
  //   setAudioObj(e.target.value);
  // };

  // const handleFileChange = e => {
  //   setFileObj(e.target.value);
  // }

  // const handleVideoChange = e => {
  //   setVideoObj(e.target.value);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          FilesHandler
        </h1>

        {/* image
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
        <button onClick={send}>send</button> */}

        <div style={{ display: "flex" }}>
          <button onClick={() => setShow(current => !current)}>toggle show</button>
          <button onClick={() => setShowClass(current => !current)} >toggle show class</button>
          {/* <button onClick={signUp}>sign up</button>
          <button onClick={login}>login</button>
          <button onClick={getInfo}>fetch</button> */}
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
