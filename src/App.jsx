import React from 'react'
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState("all");
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Theme state: check localStorage first, else system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]); 

  function addTask() {
    if (!text.trim()) {
      setText('');
      return;
    }

    setTask([{
      id: Math.random().toString(36).slice(2, 9),
      text: text,
      completed: false
    }, ...task]);
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

  // Toggle theme manually
  function toggleTheme() {
    setTheme(prev => prev === "light" ? "dark" : "light");
  }  

  const filteredTasks = task.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <>
      <div>
        <button className='theme-btn' onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
      <div className={`container ${theme}`}>
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

          <div className='btn-group'>
            <button 
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              style={{marginLeft:"0px"}} 
              onClick={() => setFilter("all")}>All
            </button>

            <button 
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}  
              onClick={() => setFilter("completed")}>Completed
            </button>

            <button 
              className={`filter-btn ${filter === "pending" ? "active" : ""}`} 
              onClick={() => setFilter("pending")}>Pending
            </button>
          </div>

          {filteredTasks.map(item => (
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
  </>
  );
}

export default App;
