import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [task, setTask] = useState([]);

  function addTask(){
    if (!text.trim()) return;

    setText('');
    setTask([{
      id: Math.random().toString(36).slice(2, 9),
      text: text}, ...task]);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className='container'>
      <h1>Your To Do</h1>
      <input 
        type="text" 
        className='input' 
        placeholder='Add new task'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button 
        className='add-btn'
        onClick={addTask}
      >+</button>
      
      {task.map(item => (
      <div className='wrapper' key={item.id}>
        <input type="checkbox" id={item.id} className="checkbox" />
        <label htmlFor={item.id} className='taskText'>{item.text}</label>
        <button className='delete'>&#10006;</button>
      </div>
      ))}

    </div>
  );
}

export default App;