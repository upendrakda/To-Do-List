import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [task, setTask] = useState([]);
  const [count, setCount] = useState(0);

  function addTask(){
    if (!text.trim()){
      setText('');
      return;
    }

    setTask([{
      id: Math.random().toString(36).slice(2, 9),
      text: text}, ...task]);
    setText('');
    setCount(count+1);
  }

  function deleteTask(id){
    setTask(task.filter(t => t.id !== id));
    setCount(count-1);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className='container'>
      <div className="content">
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
          <button 
            className='delete'
            onClick={() => deleteTask(item.id)}
            >&#10006;</button>
        </div>
        ))}
      </div>

      <footer>
        <h3>Your remaining todos: {count}</h3>
        <p><q>What you do today can improve all your tomorrows</q> — Ralph Marston</p>
      </footer>
    </div>
  );
}

export default App;