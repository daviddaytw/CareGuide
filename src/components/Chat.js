import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import Message from './Message';
import './Chat.css';
import sendIcon from '../assets/send-icon.png'; // Add send icon image in assets
import micIcon from '../assets/mic-icon.png';   // Add microphone icon image in assets

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Bot response for: ' + input, sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  const toggleRecording = () => {
    setIsRecording((prevIsRecording) => !prevIsRecording);
  };

  const onData = (recordedBlob) => {
    // Handle real-time data if needed
  };

  const onStop = (recordedBlob) => {
    const audioUrl = URL.createObjectURL(recordedBlob.blob);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Audio message', sender: 'user', audio: audioUrl },
    ]);

    // Simulate bot response to audio message
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Bot response to your audio message', sender: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} audio={msg.audio} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>
          <img src={sendIcon} alt="Send" />
        </button>
        <button className="record-button" onClick={toggleRecording}>
          <img src={micIcon} alt="Record" />
        </button>
      </div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
    </div>
  );
};

export default Chat;
