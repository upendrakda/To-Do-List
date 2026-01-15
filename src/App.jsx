import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const list=[];
  const [text, setText] = useState('');
  const [task, setTask] = useState('');

  return (
    <div className='container'>
      <h1>Your To Do</h1>
      <input 
        type="text" 
        className='input' 
        placeholder='Add new task'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button 
        className='add-btn'
        onClick={() => setText('')}
      >+</button>
      
      <div className='wrapper'>
        <input type="checkbox" id='test' className="checkbox" />
        <label htmlFor="test" className='taskText'>Hello World!!</label>
        <button className='delete'>&#10006;</button>
      </div>

    </div>
  );
}

export default App;