import React from 'react';
import './App.css';
function App() {
  return (
    <div className='container'>
      <h1>Your To Do</h1>
      <input type="text" className='input' placeholder='Add new task' />
      <button className='add-btn'>+</button>
    </div>
  );
}

export default App;