import React from 'react';
import './Message.css';
import userImage from '../assets/user.png';
import botImage from '../assets/bot.png';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const Message = ({ text, sender }) => {
  const image = sender === 'user' ? userImage : botImage;

  return (
    <div className={`message ${sender}`}>
      {sender === 'bot' && <img src={image} alt={`${sender} profile`} className="profile-image" />}
      <div className="message-text">
        <Markdown remarkPlugins={[remarkGfm]}>{ text }</Markdown>
      </div>
      {sender === 'user' && <img src={image} alt={`${sender} profile`} className="profile-image" />}
    </div>
  );
};

export default Message;
