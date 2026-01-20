import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState("all");
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

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

  const filteredTasks = task.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <>
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