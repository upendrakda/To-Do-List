import React from 'react';
import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [task, setTask] = useState([]);
  const pdfRef = useRef();

  function addTask(){
    if (!text.trim()){
      setText('');
      return;
    }

    setTask([{
      id: Math.random().toString(36).slice(2, 9),
      text: text,
      completed: false}, ...task]);
    setText('');
  }

  function deleteTask(id){
    setTask(task.filter(t => t.id !== id));
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function toggleComplete(id) {
    setTask(
      task.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  const downloadHTML = () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Create a date string (YYYY-MM-DD format)
    const now = new Date();
    const dateString = now.toISOString().split("T")[0];

    const link = document.createElement("a");
    link.href = url;
    link.download = `today's_todo-${dateString}.html`; // filename with date
    link.click();

    URL.revokeObjectURL(url);
  };


  return (
    <>
      <div className='container' ref={pdfRef}>
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
            <input 
              type="checkbox" 
              id={item.id} 
              className="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
            />
            <label htmlFor={item.id} className='taskText'>{item.text}</label>
            <button 
              className='delete'
              onClick={() => deleteTask(item.id)}
              >&#10006;</button>
          </div>
          ))}
        </div>

        <footer>
          <h3>Your remaining todos: {task.filter(t => !t.completed).length}</h3>
          
          <p><q>What you do today can improve all your tomorrows</q> — Ralph Marston</p>
        </footer>
      </div>

      <div>
        <button 
          className='save-btn'
          onClick={downloadHTML}
          >Save Page</button>
      </div>
  </>
  );
}

export default App;