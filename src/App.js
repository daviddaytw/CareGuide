import React from 'react';
import Chat from './components/Chat';
import './App.css';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Chat />
    </div>
  );
}

export default App;
