import { useState } from "react"
import Task from "../Task"
import "./Todo.css"

const Todo = () => {
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (message != "") {
      setTasks(task => [...task, {msg:message}]);
      setMessage("");
    }
  }

  const deleteTask = (test) => {
    console.log("eliminar")
    setTasks([])
  }

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
      {tasks.map((task, index) => <Task key={index} msg={task.msg} tasks={deleteTask}/>)}
    </div>
  )
}

export default Todo;