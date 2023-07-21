import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Changer } from './components/changeColor';
import { useState } from "react";

function App() {
  const [textColor, setClassColor] = useState({ errorClass: '' });
  const containerColor = {
    background: textColor.errorClass
  }
  return (
    <div style={containerColor} className='App'>
      <Changer props={setClassColor}/>
    </div>
  );
}

export default App;
