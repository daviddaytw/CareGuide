import React from 'react';
import './Message.css';
import userImage from '../assets/user.png';
import botImage from '../assets/bot.png';

const Message = ({ text, sender, audio }) => {
  const image = sender === 'user' ? userImage : botImage;

  return (
    <div className={`message ${sender}`}>
      {sender === 'bot' && <img src={image} alt={`${sender} profile`} className="profile-image" />}
      <div className="message-text">
        {audio ? (
          <audio controls>
            <source src={audio} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          text
        )}
      </div>
      {sender === 'user' && <img src={image} alt={`${sender} profile`} className="profile-image" />}
    </div>
  );
};

export default Message;
