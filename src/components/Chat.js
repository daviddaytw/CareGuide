import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import Message from './Message';
import './Chat.css';
import sendIcon from '../assets/send-icon.png'; // Add send icon image in assets
import micIcon from '../assets/mic-icon.png';   // Add microphone icon image in assets
import { StopCircleIcon } from '@heroicons/react/24/solid';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = async () => {
    const inputText = input.trim()
    if (inputText) {

      setMessages((prev) => [
        ...prev,
        { text: inputText, sender: 'user'},
      ])
      setInput('')

      const headers = new Headers()
      headers.append('Content-Type', "application/json")
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          content: inputText
        }),
        redirect: "follow",
      }
      const res = await fetch('http://10.56.204.139:5003/uploadText', requestOptions)
      const data = await res.json()
  
  
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: data.responseStringFromAI, sender: 'bot', audio: `http://10.56.204.139:5003/get_audio?${Math.random()}` },
        ])
      }, 1000);

    }
  };

  const startRecording = () => {
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  const onData = (recordedBlob) => {
    // Handle real-time data if needed
  };  

  const onStop = async (recording) => {
    const formdata = new FormData()
    formdata.append("file", recording.blob, "speech.mp3")

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }
    const res = await fetch('http://10.56.204.139:5003/uploadFile', requestOptions)
    const data = await res.json()

    setMessages((prev) => [
      ...prev,
      { text: data.transcription, sender: 'user'},
    ])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: data.responseStringData, sender: 'bot', audio: `http://10.56.204.139:5003/get_audio?${Math.random()}` },
      ])
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} audio={msg.audio} />
        ))}
      </div>
      <div className={`flex gap-3 ${isRecording && 'hidden'}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>
          <img src={sendIcon} alt="Send" />
        </button>
        <button className="record-button" onClick={startRecording}>
          <img src={micIcon} alt="Record" />
        </button>
      </div>
      <div className={ isRecording ? 'flex block' : 'hidden' }>
        <ReactMic
          record={isRecording}
          visualSetting="frequencyBars"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={stopRecording}><StopCircleIcon className='h-10'/></button>
      </div>
    </div>
  );
};

export default Chat;
