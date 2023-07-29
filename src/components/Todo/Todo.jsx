import { useState } from "react"
import Task from "../Task"
import "./Todo.css"

let count = 0;

const Todo = () => {
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (message != "") {
      setTasks(task => [...task, {id:count++, msg:message}]);
      setMessage("");
    }
  }

  const deleteTask = id => setTasks(tasks => tasks.filter(task => task.id !== id));

  const editTask = (id) => setMessage(tasks.find(task => task.id === id).msg);
  
  const func = {deleteTask,editTask};
  
  return (
    <div className="card">
      <div className="header-card">
        <input className="input-task" 
        type="text" 
        placeholder="Ingrese una tarea" 
        onChange={e => setMessage(e.target.value)}
        value={message} />
        <button className="add-btn" type="button" onClick={addTask}>Agregar</button>
      </div>
      {tasks.map(task => <Task key={task.id} {...task} {...func}/>)}
    </div>
  )
}

export default Todo;