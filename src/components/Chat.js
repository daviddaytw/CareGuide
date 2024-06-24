import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import Message from './Message';
import './Chat.css';
import sendIcon from '../assets/send-icon.png'; // Add send icon image in assets
import micIcon from '../assets/mic-icon.png';   // Add microphone icon image in assets
import { StopCircleIcon } from '@heroicons/react/24/solid';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: `
Hello! I'm your personalized AI assistant from the CareGuide team, here to help answer any questions you have about your doctor's visit. How can I assist you today?`, sender: 'bot'}
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const invokeAI = async (text) => {
    const headers = new Headers()
    headers.append('Content-Type', "application/json")
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        content: text
      }),
      redirect: "follow",
    }
    // const res = await fetch('http://10.56.204.139:5003/uploadText', requestOptions)
    // const res = await fetch('http://localhost:5003/uploadText', requestOptions)
    const res = await fetch('/uploadText', requestOptions)


    const data = await res.json()

    console.log(data)

    setTimeout(async () => {
      setMessages((prev) => [
        ...prev,
        { text: data.replyStringFromAI, sender: 'bot'},
      ])
      // const audio = new Audio(`http://10.56.204.139:5003/get_audio?${Math.random()}`)
      // const audio = new Audio(`http://localhost:5003/get_audio?${Math.random()}`)
      const audio = new Audio(`/get_audio?${Math.random()}`)


      await audio.play()
      setIsProcessing(false)
    }, 1000);
  }

  const handleSend = async () => {
    setIsProcessing(true)
    const inputText = input.trim()
    if (inputText) {

      setMessages((prev) => [
        ...prev,
        { text: inputText, sender: 'user'},
      ])
      setInput('')

      await invokeAI(inputText.trim())
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
    setIsProcessing(true)
    const formdata = new FormData()
    formdata.append("file", recording.blob, "speech.mp3")

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }
    // const res = await fetch('http://10.56.204.139:5003/uploadFile', requestOptions)
    // const res = await fetch('http://localhost:5003/uploadFile', requestOptions)
    const res = await fetch('/uploadFile', requestOptions)


    const data = await res.json()

    setMessages((prev) => [
      ...prev,
      { text: data.transcription, sender: 'user'},
    ])

    await invokeAI(data.transcription)
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} audio={msg.audio} />
        ))}
      </div>
      {
        isProcessing ? (
          <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <>
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
          </>
        )
      }
    </div>
  );
};

export default Chat;
